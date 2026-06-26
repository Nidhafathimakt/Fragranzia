const Order = require("../models/order");
const razorpay = require("../utils/razorpay");
const {
  checkStockAvailability,
  decrementStock,
} = require("../utils/stockHelper");
const User = require("../models/user");

const formatShippingAddress = (addr) => {
  if (!addr) return null;
  return {
    fullName: addr.fullName || "",
    phone: addr.phone || "",
    addressLine1: addr.addressLine1 || "",
    addressLine2: addr.addressLine2 || "",
    city: addr.city || "",
    state: addr.state || "",
    postalCode: addr.postalCode || "",
    country: addr.country || "",
  };
};

const postOrder = async (req, res) => {
  try {
    const { orderItems, paymentMethod, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Please select a payment method",
      });
    }

    const formattedShipping = formatShippingAddress(shippingAddress);
    if (!formattedShipping?.addressLine1) {
      return res.status(400).json({
        success: false,
        message: "Please add a delivery address",
      });
    }

    const stockErrors = await checkStockAvailability(orderItems);
    if (stockErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: stockErrors[0],
        errors: stockErrors,
      });
    }

    const formattedItems = orderItems.map((item) => ({
      product: item.product,
      name: item.name,
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
    }));

    const totalPrice = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.userId,
      orderItems: formattedItems,
      totalPrice,
      paymentMethod,
      shippingAddress: formattedShipping,
      paymentStatus: paymentMethod === "upi" ? "Pending" : "Pending",
      deliveryStatus: "Pending",
    });

    const savedOrder = await order.save();
    await decrementStock(formattedItems);
    await User.findByIdAndUpdate(req.userId, { cart: [], cart_total: 0 });

    if (paymentMethod === "cod") {
      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: savedOrder,
      });
    }

    if (paymentMethod === "upi") {
      try {
        const razorpayOrder = await razorpay.orders.create({
          amount: Math.round(totalPrice * 100),
          currency: "INR",
          receipt: `receipt_${savedOrder._id}`,
        });

        savedOrder.razorpay_order_id = razorpayOrder.id;
        await savedOrder.save();

        return res.status(201).json({
          success: true,
          message: "Order created successfully",
          order: savedOrder,
          razorpayOrder,
        });
      } catch (razorpayError) {
        console.log("Razorpay error:", razorpayError.message);
        return res.status(201).json({
          success: true,
          message:
            "Order saved. Online payment unavailable — use Cash on Delivery or try again later.",
          order: savedOrder,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.log("order error", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("user", "name phone email")
      .populate({
        path: "orderItems.product",
        select: "text price image stock",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name phone email")
      .populate({
        path: "orderItems.product",
        select: "text price image",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name phone email")
      .populate("orderItems.product", "text price image stock");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (
      req.userRole !== "admin" &&
      order.user._id.toString() !== req.userId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus } = req.body;

    const updateData = { deliveryStatus };
    if (deliveryStatus === "Delivered") {
      updateData.deliveredAt = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  postOrder,
  getOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
