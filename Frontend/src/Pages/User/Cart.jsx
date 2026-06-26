import React, { useContext } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { ShopContext } from "../../context/ShopContext";
import { getStock } from "../../utils/authHelpers";

function Cart() {
  const {
    cartItems,
    removeCartItem,
    handleCheckout,
    handleHome,
    handleBuy,
    updateCartQuantity,
  } = useContext(ShopContext);

  // Increase Quantity
  const increaseQuantity = async (productId, currentQty, stock) => {
    const maxStock = getStock(stock);
    if (currentQty >= maxStock) return;
    await updateCartQuantity(productId, currentQty + 1);
  };

  // Decrease Quantity
  const decreaseQuantity = async (productId, currentQty) => {
    if (currentQty <= 1) return;

    const newQty = currentQty - 1;
    await updateCartQuantity(productId, newQty);
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.product?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-10 px-8 lg:px-10 mt-5 h-[calc(100vh-100px)] overflow-hidden">

        {/* LEFT SIDE */}
        <div className="flex-1 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          <h2 className="text-4xl font-semibold">Cart</h2>

          <div className="flex gap-2 mt-2 text-gray-400">
            <p
              className="flex gap-2 cursor-pointer"
              onClick={handleHome}
            >
              Home
              <FaGreaterThan className="mt-2" size={10} />
            </p>

            <p>Cart</p>
          </div>

          {cartItems.length === 0 ? (
            <p className="font-semibold text-2xl flex flex-col lg:flex-row lg:justify-center items-center px-10 lg:px-100 py-25">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product._id}
                className="border-2 border-gray-200 rounded-lg shadow-xl px-10 py-8 mt-5 flex flex-col lg:flex-row gap-5 w-[320px] lg:w-[1000px]"
              >
                {/* IMAGE */}
                <div>
                  <img
                    src={`http://localhost:5000/uploads/${item.product?.image}`}
                    alt={item.product?.title}
                    className="w-40 h-40 object-contain mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>

                {/* DETAILS */}
                <div>
                  <h3 className="font-semibold text-2xl">
                    {item.product?.text}
                  </h3>

                  {/* QUANTITY */}
                  <div className="border-2 rounded-lg py-1 px-2 w-20 justify-between flex gap-3 mt-3">
                    <button
                      className="font-semibold cursor-pointer"
                      onClick={() =>
                        decreaseQuantity(
                          item.product._id,
                          item.quantity
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>

                    <p className="font-bold">
                      {item.quantity}
                    </p>

                    <button
                      className="font-semibold cursor-pointer"
                      onClick={() =>
                        increaseQuantity(
                          item.product._id,
                          item.quantity,
                          item.product?.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="flex gap-5">
                    <p className="font-bold text-2xl mt-2">
                      Rs {Number(item.product?.price || 0) * item.quantity}
                    </p>

                    <p className="mt-4 text-gray-500 font-normal line-through">
                      Rs 200
                    </p>

                    <p className="text-green-600 font-bold text-sm mt-4">
                      61% off
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col lg:flex-row gap-3">

                    <button
                      className="remove-btn text-red-500 px-20 py-1 border-2 border-red-500 rounded mt-3 font-semibold cursor-pointer"
                      onClick={() =>
                        removeCartItem(item.product._id)
                      }
                    >
                      Delete
                    </button>

                    <button
                      className="buy-btn px-20 py-1 rounded mt-3 font-semibold cursor-pointer"
                      onClick={() =>
                        handleBuy(item.product._id)
                      }
                    >
                      Buy
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE */}
        {cartItems.length > 0 && (
        <div className="lg:sticky lg:top-24 h-fit">

          <div className="border-2 border-gray-200 rounded-lg shadow-xl w-[320px] lg:w-[500px] px-4 py-5">

            <h2 className="font-bold text-2xl">
              Check Out
            </h2>

            <p className="flex lg:flex-row gap-25 lg:gap-66 mt-3 text-lg/7">
              Price ({cartItems.length} items)
              <span className="font-bold">
                Rs {totalPrice}
              </span>
            </p>

            <p className="flex lg:flex-row gap-35 lg:gap-76 text-lg/7">
              Discount
              <span className="font-bold">
                Rs 0
              </span>
            </p>

            <p className="flex lg:flex-row gap-25 lg:gap-66 text-lg/7">
              Delivery Charge
              <span className="text-green-500 font-semibold">
                Free
              </span>
            </p>

            <p className="flex lg:flex-row gap-20 lg:gap-61 mt-5 font-semibold text-xl">
              Total Amount
              <span className="font-bold">
                Rs {totalPrice}
              </span>
            </p>
          </div>

          <button
            onClick={handleCheckout}
            className="proceed-btn text-white px-4 py-2 rounded mt-3 w-80 font-semibold lg:w-full cursor-pointer"
          >
            Proceed to Buy
          </button>

          <p className="text-gray-500 font-normal px-10 text-sm flex lg:flex-row lg:justify-center items-center mt-5">
            Safe and Secure Payments. Easy
            <br />
            returns.100% Authentic products.
          </p>

        </div>
        )}
      </div>
    </div>
  );
}

export default Cart;