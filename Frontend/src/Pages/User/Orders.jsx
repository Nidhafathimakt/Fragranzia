// import React, { useContext, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import { ShopContext } from "../../context/ShopContext";

// function Orders() {
//   const { orderDetails, orders, fetchOrder } = useContext(ShopContext);

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   return (
//     <div className="h-full overflow-y-auto scrollbar-hide pr-2">
//       {/* Heading */}
//       <h2 className="text-2xl font-semibold text-[#00354B]">
//         My Orders
//       </h2>

//       {/* Search */}
//       <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-5 bg-white">
//         <input
//           type="text"
//           className="flex-1 px-4 py-3 outline-none"
//           placeholder="Search your orders here"
//         />

//         <button className="bg-[#00354B] text-white px-5 py-3 flex items-center gap-2 font-medium">
//           <FiSearch />
//           Search Orders
//         </button>
//       </div>

//       {/* Orders */}
//       {orders?.length > 0 ? (
//         <div className="mt-6 space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
//             >
//               {/* Order Header */}
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-5 border-b border-gray-200">
//                 <div>
//                   <h3 className="text-xl font-bold text-[#00354B]">
//                     Order #{order._id?.slice(-6)}
//                   </h3>

//                   <p className="text-gray-500 mt-1">
//                     {order.orderItems?.length} Product
//                     {order.orderItems?.length > 1 ? "s" : ""}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => orderDetails(order)}
//                   className="mt-3 lg:mt-0 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
//                 >
//                   View Details
//                 </button>
//               </div>

//               {/* Order Summary */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 border-b border-gray-200">
//                 <div>
//                   <p className="text-sm text-gray-500">Status</p>

//                   <p className="font-semibold text-green-600 capitalize">
//                     {order.deliveryStatus || "Placed"}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">
//                     Delivery Date
//                   </p>

//                   <p className="font-medium">
//                     Delivery expected on May 14
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">
//                     Total Amount
//                   </p>

//                   <p className="font-bold text-lg text-[#00354B]">
//                     ₹{order.totalAmount || 0}
//                   </p>
//                 </div>
//               </div>

//               {/* Products */}
//               <div className="p-5">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                   {order.orderItems?.map((item) => (
//                     <div
//                       key={item.product?._id}
//                       onClick={() => orderDetails(order)}
//                       className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
//                     >
//                       {/* Product Image */}
//                       <img
//                         src={
//                           item.product?.image
//                             ? `http://localhost:5000/uploads/${item.product.image}`
//                             : "/placeholder.png"
//                         }
//                         alt={item.product?.text || "Product"}
//                         className="w-20 h-20 object-cover rounded-lg border"
//                       />

//                       {/* Product Info */}
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-800">
//                           {item.product?.text ||
//                             "No Product Name"}
//                         </h4>

//                         <p className="text-sm text-gray-500 mt-1">
//                           Quantity: {item.quantity}
//                         </p>

//                         <p className="font-bold text-[#00354B] mt-2">
//                           ₹{item.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-[60vh]">
//           <p className="text-xl text-gray-500 font-medium">
//             No orders found
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;


import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import { ShopContext } from "../../context/ShopContext";

function Orders() {
  const { orderDetails, orders, fetchOrder } = useContext(ShopContext);

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("All");

  useEffect(() => {
    fetchOrder();
  }, []);

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders?.filter(
          (order) =>
            order.deliveryStatus?.toLowerCase() ===
            statusFilter.toLowerCase()
        );

  return (
    <div className="h-full overflow-y-auto scrollbar-hide pr-2">
      {/* Breadcrumb */}
      {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Home</span>
        <span>›</span>
        <span>My Account</span>
        <span>›</span>
        <span className="text-gray-700 font-medium">My Orders</span>
      </div> */}

      {/* Heading */}
      <h2 className="text-3xl font-semibold text-[#00354B]">
        My Orders
      </h2>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-6 gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-5 py-2 rounded-full border transition ${
              statusFilter === "All"
                ? "border-[#8B3A3A] text-[#8B3A3A]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-5 py-2 rounded-full border transition ${
              statusFilter === "pending"
                ? "border-[#8B3A3A] text-[#8B3A3A]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setStatusFilter("Delivered")}
            className={`px-5 py-2 rounded-full border transition ${
              statusFilter === "Delivered"
                ? "border-[#8B3A3A] text-[#8B3A3A]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            Delivered
          </button>

          <button
            onClick={() => setStatusFilter("Cancelled")}
            className={`px-5 py-2 rounded-full border transition ${
              statusFilter === "Cancelled"
                ? "border-[#8B3A3A] text-[#8B3A3A]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            Cancelled
          </button>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-5 py-3 rounded-full border border-gray-300 outline-none text-gray-600"
        >
          <option value="All">Select date range</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last 1 Year</option>
        </select>
      </div>

      {/* Search */}
      {/* <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden mt-6 bg-white">
        <input
          type="text"
          className="flex-1 px-4 py-3 outline-none"
          placeholder="Search your orders here"
        />

        <button className="bg-[#00354B] text-white px-5 py-3 flex items-center gap-2">
          <FiSearch />
          Search
        </button>
      </div> */}

      {/* Orders */}
      {filteredOrders?.length > 0 ? (
        <div className="mt-8 space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              onClick={() => orderDetails(order)}
              className="border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-all bg-white"
            >
              {/* Status Row */}
              <div className="flex items-center gap-4 mb-5">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.deliveryStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.deliveryStatus === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  ● {order.deliveryStatus || "In Progress"}
                </span>

                <span className="text-gray-500 text-sm">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "10 May 2025"}
                </span>
              </div>

              {/* Main Content */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <img
                    src={
                      order.orderItems?.[0]?.product?.image
                        ? `http://localhost:5000/uploads/${order.orderItems[0].product.image}`
                        : "/placeholder.png"
                    }
                    alt="product"
                    className="w-20 h-20 object-cover rounded-lg "
                  />

                  <div>
                    <h3 className="text-lg font-bold text-[#8B3A3A]">
                      Order ID: {order._id?.slice(-8)}
                    </h3>

                    <p className="text-gray-700 mt-1">
                      {order.orderItems
                        ?.slice(0, 3)
                        .map((item) => item.product?.text)
                        .join(" | ")}

                      {order.orderItems?.length > 3 &&
                        ` & ${order.orderItems.length - 3} more items`}
                    </p>

                    <p className="font-bold text-xl mt-2">
                      ₹{order.totalPrice || 0}
                    </p>
                  </div>
                </div>

                <FaChevronRight className="text-[#8B3A3A] text-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-lg">
            No orders found
          </p>
        </div>
      )}
    </div>
  );
}

export default Orders;