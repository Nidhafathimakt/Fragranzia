const Order = require("../models/order");
const { incrementStock } = require("../utils/stockHelper");

const RETURN_WINDOW_DAYS = 7;

const requestReturn = async (req, res) => {
  try {
    const { orderId, returnReason, returnComments, returnImage } = req.body;

    const order = await Order.findOne({ _id: orderId, user: req.userId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.deliveryStatus !== "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Return is only available after delivery.",
      });
    }

    if (order.isReturned && order.returnStatus !== "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Return already requested for this order.",
      });
    }

    const deliveredAt = order.deliveredAt || order.updatedAt;
    const daysSince = (Date.now() - new Date(deliveredAt)) / (1000 * 60 * 60 * 24);
    if (daysSince > RETURN_WINDOW_DAYS) {
      return res.status(400).json({
        success: false,
        message: "Return request must be submitted within 7 days of delivery.",
      });
    }

    order.isReturned = true;
    order.returnReason = returnReason;
    order.returnComments = returnComments || "";
    order.returnImage = returnImage || "";
    order.returnStatus = "Requested";
    order.returnedAt = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Return request submitted",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserReturns = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
      isReturned: true,
    }).populate("orderItems.product", "text image price");

    res.status(200).json({ success: true, returns: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllReturns = async (req, res) => {
  try {
    const returns = await Order.find({ isReturned: true })
      .populate("user", "name email phone")
      .populate("orderItems.product", "text image")
      .sort({ returnedAt: -1 });

    res.status(200).json({ success: true, returns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReturnStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { returnStatus, adminRemarks } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const prevStatus = order.returnStatus;
    order.returnStatus = returnStatus;
    if (adminRemarks) order.adminRemarks = adminRemarks;

    if (returnStatus === "Approved" && prevStatus !== "Approved") {
      await incrementStock(order.orderItems);
      order.deliveryStatus = "Returned";
    }

    if (returnStatus === "Completed") {
      order.deliveryStatus = "Returned";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: `Return ${returnStatus.toLowerCase()}`,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  requestReturn,
  getUserReturns,
  getAllReturns,
  updateReturnStatus,
};
