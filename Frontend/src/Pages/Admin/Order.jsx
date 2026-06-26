import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminService from "../../services/admin-api-service/AdminService";

const STATUS_OPTIONS = [
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function Order() {
  const { updateOrderStatus, getAllOrders } = AdminService();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      if (res.success) setOrders(res.orders);
    } catch (e) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onHandleStatusChange = async (orderId, deliveryStatus) => {
    try {
      await updateOrderStatus(orderId, deliveryStatus);
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  if (loading) {
    return <div className="p-6 animate-pulse h-40 bg-gray-100 rounded" />;
  }

  return (
    <div className="px-4 sm:px-6 py-6 border-b border-black/10">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Manage Orders</h2>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 shadow-sm rounded-lg p-4 mt-4"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
              <div>
                <p className="font-medium">
                  {order.user?.name || "Customer"} — {order.user?.email}
                </p>
                <p className="text-sm text-gray-500">Order: {order._id}</p>
                <p className="text-sm text-gray-500">
                  Total: ₹{order.totalPrice} | Payment: {order.paymentStatus}
                </p>
              </div>
              <select
                value={order.deliveryStatus}
                onChange={(e) => onHandleStatusChange(order._id, e.target.value)}
                className="border rounded px-3 py-2 text-sm h-fit"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              {order.orderItems?.map((item) => (
                <div key={item._id} className="flex gap-3 items-center border-t pt-2">
                  <img
                    src={
                      item.product?.image
                        ? `http://localhost:5000/uploads/${item.product.image}`
                        : "/placeholder.png"
                    }
                    alt=""
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {item.product?.text || item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} — ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-10">No orders found</p>
      )}
    </div>
  );
}

export default Order;
