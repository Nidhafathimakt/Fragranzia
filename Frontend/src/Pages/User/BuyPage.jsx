import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useParams } from "react-router";
import axios from "../../axios";
const API_URL = "http://localhost:5000/api";

function BuyPage() {
  const { address, defaultAddress } = useContext(ShopContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  //  const totalPrice = cartItems.reduce(
  //   (acc, item) => acc + item.product.price * item.quantity,
  //   0
  // );

  const selectedAddress = address.find((addr) => addr._id === defaultAddress);


  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      {/* Step Progress */}
      <div className="bg-white rounded-md shadow-sm mb-6 p-4 md:p-6">
        <div className="relative max-w-3xl mx-auto flex justify-between md:justify-center md:gap-33 items-center">
          {/* Lines (keep same design, just adjust for small screens) */}
          {/* Line: Address → Order Summary */}
          <div className="absolute top-5 left-[15%] w-[25%] md:left-[26%] md:w-[20%] h-[2px] bg-blue-600 -translate-y-1/2"></div>

          {/* Line: Order Summary → Payment */}
          <div className="absolute top-5 left-[58%] w-[25%] md:left-[53%] md:w-[20%] h-[2px] bg-gray-300 -translate-y-1/2"></div>
          {/* Step 1 */}
          <div className="z-10 flex flex-col items-center text-center">
            <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 bg-white text-sm">
              ✓
            </div>
            <p className="text-xs md:text-sm mt-2 text-gray-600">Address</p>
          </div>

          {/* Step 2 */}
          <div className="z-10 flex flex-col items-center text-center">
            <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm">
              2
            </div>
            <p className="text-xs md:text-sm mt-2 font-semibold">
              Order Summary
            </p>
          </div>

          {/* Step 3 */}
          <div className="z-10 flex flex-col items-center text-center">
            <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 text-sm">
              3
            </div>
            <p className="text-xs md:text-sm mt-2 text-gray-400">Payment</p>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Address */}
          <div className="bg-white rounded-md shadow-sm p-4 md:p-5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
              <div>
                <p className="text-black-600 text-xl">Deliver to:</p>
                
                {selectedAddress ? (
                  <div className="space-y-2 mt-5">
                    <h2 className="font-semibold text-base md:text-xl">
                      {selectedAddress.fullName}
                    </h2>

                    <p className="mt-2 text-base flex flex-wrap gap-2">
                      <span>{selectedAddress.addressLine1},</span>
                      <span>{selectedAddress.city},</span>
                      <span>{selectedAddress.state}</span>
                      <span>{selectedAddress.postalCode}</span>
                    </p>

                    <p className="mt-2 text-base">{selectedAddress.phone}</p>
                  </div>
                ) : (
                  <p className="mt-5 text-red-500">
                    No default address selected
                  </p>
                )}
              </div>

              <button className="border border-blue-500 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 self-start sm:self-auto">
                Change
              </button>
            </div>
          </div>

          {/* Product */}
          <div className="bg-white rounded-md shadow-sm p-4 md:p-5 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <img
              src={`http://localhost:5000/uploads/${product?.image}`}
              // alt={}
              className="w-50 h-50 object-contain"
            />

            <div className="flex-1 text-center 2xl:text-left">
              <p className="font-medium text-2xl text-gray-800">
                {product?.text}
              </p>
              {/* <p className="text-sm text-gray-500">15 g</p> */}

              <p className="text-lg font-semibold mt-2 text-gray-900">
                ₹{product?.price}
              </p>

              <p className="text-sm text-gray-500">Delivery in 2 days</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/3">
          {/* Price Box */}
          <div className="bg-white rounded-md shadow-sm p-4 md:p-5 space-y-3">
            <div className="flex justify-between text-gray-600">
              <p>MRP</p>
              <p>₹{product?.price}</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Fees</p>
              <p>₹7</p>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <p>Total Amount</p>
              <p>₹156</p>
            </div>
          </div>

          {/* Continue */}
          <div className="bg-white rounded-md shadow-sm p-4 mt-4 flex justify-between items-center">
            <p className="text-lg font-semibold">₹156</p>
            <button className="bg-yellow-400 hover:bg-yellow-500 px-5 md:px-6 py-2 rounded font-semibold">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;
