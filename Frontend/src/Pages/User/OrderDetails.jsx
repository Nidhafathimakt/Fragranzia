import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { getUploadUrl } from "../../axios";
import { FaCheckCircle, FaRegCircle, FaMapMarkerAlt } from "react-icons/fa";

const TRACKING_STEPS = [
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function OrderDetails() {
  const { selectedOrder, address, defaultAddress } = useContext(ShopContext);
  const navigate = useNavigate();

  const shipping =
    selectedOrder?.shippingAddress &&
    Object.keys(selectedOrder.shippingAddress).length > 0 &&
    selectedOrder.shippingAddress.addressLine1
      ? selectedOrder.shippingAddress
      : address?.find((a) => a._id === defaultAddress) || null;

  const currentStepIndex = TRACKING_STEPS.indexOf(
    selectedOrder?.deliveryStatus || "Pending"
  );

  const canReturn =
    selectedOrder?.deliveryStatus === "Delivered" &&
    !selectedOrder?.isReturned;



  if (!selectedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-500 text-center">
          No Order Selected
        </h2>
      </div>
    );
    
  }
  const totalAmount =
    selectedOrder.totalPrice ??
    selectedOrder.orderItems?.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );

  return (
    //  FULL PAGE SCROLL ENABLED
    <div className="min-h-screen px-3 sm:px-6 lg:px-10 py-4 sm:py-6">

      <div className="max-w-7xl mx-auto">

        {/* SUMMARY */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">
          
          {/* DESKTOP UI SAME */}
          <div className="hidden sm:grid grid-cols-3 gap-4">

            <div>
              <h3 className="font-bold text-lg">
                Order #{selectedOrder._id?.slice(-8)}
              </h3>
              <p className="text-gray-500 text-sm">
                {selectedOrder.orderItems?.length} Items
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl text-[#00354B]">
                ₹{totalAmount}
              </h3>
              <p className="text-gray-500 text-sm">Total Amount</p>
            </div>

            <div>
              <h3 className="font-medium text-base">
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </h3>
              <p className="text-gray-500 text-sm">Order Date</p>
            </div>

          </div>

          {/* MOBILE */}
          <div className="sm:hidden space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">
                  Order #{selectedOrder._id?.slice(-8)}
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedOrder.orderItems?.length} Items
                </p>
              </div>

              <div className="text-right">
                <h3 className="font-bold text-lg text-[#00354B]">
                  ₹{selectedOrder.totalPrice }
                </h3>
                <p className="text-gray-500 text-xs">
                  Total Amount
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium text-sm">
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col">

            <h2 className="text-lg sm:text-2xl font-semibold text-[#00354B] mb-4">
              Items Ordered & Delivery Details
            </h2>

            {/* TRACKING */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-4 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[500px] text-[10px] sm:text-xs">
                {TRACKING_STEPS.map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center shrink-0">
                      {index <= currentStepIndex ? (
                        <FaCheckCircle className="text-green-500" size={18} />
                      ) : (
                        <FaRegCircle className="text-gray-300" size={18} />
                      )}
                      <p className="mt-1 text-center max-w-[70px]">{step}</p>
                    </div>
                    {index < TRACKING_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-1 ${
                          index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {canReturn && (
              <button
                onClick={() =>
                  navigate("/account/return/" + selectedOrder._id, {
                    state: { order: selectedOrder },
                  })
                }
                className="mb-4 px-4 py-2 border border-[#00354B] text-[#00354B] rounded-lg text-sm hover:bg-[#00354B] hover:text-white transition"
              >
                Request Return (within 7 days)
              </button>
            )}

            {selectedOrder?.returnStatus && (
              <p className="mb-4 text-sm text-orange-600">
                Return Status: {selectedOrder.returnStatus}
              </p>
            )}

            {/* PRODUCT LIST */}
            <div
              className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5
              lg:max-h-[50vh] lg:overflow-y-auto space-y-4 [scrollbar-width:none]"
            >

              {selectedOrder.orderItems?.map((item) => (
                <div
                  key={item.product?._id}
                  className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-200 rounded-lg p-3 sm:p-4"
                >

                  {/* LEFT */}
                  <div className="flex gap-3 sm:gap-4">

                    <img
                      src={getUploadUrl(item.product?.image)}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0"
                      alt=""
                    />

                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-lg break-words">
                        {item.product?.text}
                      </h4>

                      <p className="text-gray-500 text-sm mt-1">
                        Qty: {item.quantity}
                      </p>

                      <p className="font-bold mt-1 text-sm sm:text-base">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="text-left sm:text-right">
                    <p className="text-orange-500 font-semibold text-sm">
                      {selectedOrder.deliveryStatus}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Expected Delivery Soon
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5 lg:sticky lg:top-5 lg:self-start">

            {/* ADDRESS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-semibold text-base sm:text-lg mb-3">
                Delivery Address
              </h3>

              <div className="flex gap-3 text-sm sm:text-base">

                <FaMapMarkerAlt className="text-[#00354B] mt-1 shrink-0" />

                <div className="break-words">
  {shipping ? (
    <>
      <h2 className="font-semibold text-base md:text-lg">
        {shipping.fullName}
      </h2>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {shipping.addressLine1}
        {shipping.addressLine2 && `, ${shipping.addressLine2}`}
        <br />
        {shipping.city}, {shipping.state}
        <br />
        {shipping.country} - {shipping.postalCode}
      </p>

      <p className="mt-2 text-sm text-gray-700">{shipping.phone}</p>
    </>
  ) : (
    <p className="text-red-500">Address not available</p>
  )}
</div>

              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">

              <h3 className="font-semibold text-base sm:text-lg mb-3">
                Payment Details
              </h3>

              <div className="space-y-2 text-sm">

                {selectedOrder.orderItems?.map((item) => (
                  <div
                    key={item.product?._id}
                    className="flex justify-between gap-3"
                  >
                    <span className="truncate max-w-[180px] sm:max-w-none">
                      {item.product?.text}
                    </span>

                    <span className="shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderDetails;

