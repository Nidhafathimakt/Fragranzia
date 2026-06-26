const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      orders,
      returnRequests,
    ] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.countDocuments(),
      Order.find().select("totalPrice deliveryStatus paymentStatus createdAt"),
      Order.countDocuments({ returnStatus: { $in: ["Requested", "Approved"] } }),
    ]);

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "Paid" || o.deliveryStatus !== "Cancelled")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    const pendingOrders = orders.filter((o) => o.deliveryStatus === "Pending").length;
    const deliveredOrders = orders.filter((o) => o.deliveryStatus === "Delivered").length;

    const monthlySales = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", { month: "short", year: "numeric" });
      monthlySales[key] = { sales: 0, orders: 0, revenue: 0 };
    }

    orders.forEach((order) => {
      const key = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (monthlySales[key]) {
        monthlySales[key].orders += 1;
        monthlySales[key].revenue += order.totalPrice || 0;
        monthlySales[key].sales += order.totalPrice || 0;
      }
    });

    const statusBreakdown = {};
    orders.forEach((o) => {
      statusBreakdown[o.deliveryStatus] = (statusBreakdown[o.deliveryStatus] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      stats: {
        totalSales: totalRevenue,
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        pendingOrders,
        deliveredOrders,
        returnRequests,
      },
      monthlySales: Object.entries(monthlySales).map(([month, data]) => ({
        month,
        ...data,
      })),
      statusBreakdown: Object.entries(statusBreakdown).map(([status, count]) => ({
        status,
        count,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
