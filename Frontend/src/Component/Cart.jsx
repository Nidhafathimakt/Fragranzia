import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ShopContext } from "../context/ShopContext";
function Cart() {
  const { cartItems, setCartItems, quantity, setQuantity } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const removeCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleHome = () => {
    navigate("/home");
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div>
      <Header className="border-b border-gray-300 shadow-lg" />
      <div className="flex flex-col lg:flex-row  justify-between gap-10 px-8 lg:px-10 mt-5">
        <div>
          <h2 className="text-4xl font-semibold">Cart</h2>
          <div className="flex gap-1 mt-2">
            <p className="flex gap-1 cursor-pointer " onClick={handleHome}>
              Home <FaGreaterThan className="mt-2" size={13} />
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
                key={item.id}
                className="border-2 border-gray-200 rounded-lg shadow-xl px-10 py-8 mt-5 flex flex-col lg:flex-row gap-5 w-[350px] lg:w-[1000px]"
              >
                <div>
                  <img
                    src={item.image}
                    className="w-50 h-50 object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-2xl">{item.title}</h3>
                  <div className="border-2 rounded-lg py-1 px-2 w-20 justify-between flex gap-3 mt-3 ">
                    <button
                      className="font-semibld"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <p className="font-bold">{item.quantity}</p>
                    <button
                      className="font-semibold"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-5">
                    <p className="font-bold text-2xl mt-2">
                      Rs {item.price * item.quantity}{" "}
                    </p>
                    <p className="mt-4 text-gray-500 font-normal line-through">
                      Rs 200
                    </p>
                    <p className="text-green-600 font-bold text-sm mt-4">
                      61% off
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3">
                    <button
                      className="remove-btn text-red-500 px-20 py-1 border-2 border-red-500 rounded mt-3 font-semibold"
                      onClick={() => removeCart(item.id)}
                    >
                      delete
                    </button>
                    <button className="share-btn text-black-500 px-20 py-1 border-2 border-black-500 rounded mt-3 font-semibold">
                      Share
                    </button>
                    <button className="buy-btn px-20 py-1 rounded mt-3 font-semibold">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <div className="border-2 border-gray-200 rounded-lg shadow-xl w-[350px] lg:w-[500px] px-6 py-5 ">
            <h2 className="font-bold text-2xl">Check Out</h2>
            <p className="flex lg:flex-row gap-25 lg:gap-66 mt-3 text-lg/7">
              Price (3 items) <span className="font-bold">Rs 3,097</span>
            </p>
            <p className="flex lg:flex-row gap-35 lg:gap-76 text-lg/7">
              Discount <span className="font-bold">Rs 4,404</span>
            </p>
            <p className="flex lg:flex-row gap-25 lg:gap-66 text-lg/7">
              Delivery Charge{" "}
              <span className="text-green-500 font-semibold">Rs Free</span>
            </p>
            <p className="flex lg:flex-row gap-20 lg:gap-61 mt-5 font-semibold text-xl">
              Total Amount <span className="font-bold">Rs 3,493</span>
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="proceed-btn text-white px-4 py-2 rounded mt-3 w-80 font-semibold lg:w-full"
          >
            Proceed to Buy
          </button>
          <p className="text-gray-500 font-normal px-10 text-sm flex lg:flex-row lg:justify-center items-center mt-5">
            Safe and Secure Payments. Easy <br />
            returns.100% Authentic products.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

//   // Calculate Total Price
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );


//         <div>
//           <div className="border-2 border-gray-200 rounded-lg shadow-xl w-[500px] px-6 py-5">
//             <h2 className="font-bold text-2xl">Check Out</h2>

//             <p className="flex justify-between text-lg/7 mt-5">
//               Total Items{" "}
//               <span className="font-bold">{cartItems.length}</span>
//             </p>

//             <p className="flex justify-between text-lg/7 mt-2">
//               Total Price{" "}
//               <span className="font-bold">Rs {totalPrice}</span>
//             </p>

//             <p className="flex justify-between text-lg/7 mt-2">
//               Delivery Charge <span className="text-green-500">Free</span>
//             </p>

//             <p className="flex justify-between font-semibold text-xl mt-4">
//               Final Amount <span className="font-bold">Rs {totalPrice}</span>
//             </p>
//           </div>

//           <button
//             onClick={handleCheckout}
//             className="proceed-btn text-white px-4 py-2 rounded mt-3 font-semibold w-full"
//           >
//             Proceed to Buy
//           </button>

//           <p className="text-gray-500 font-normal text-sm flex justify-center items-center mt-5">
//             Safe and Secure Payments.
//             <br />
//             Easy returns. 100% Authentic products.
//           </p>
//         </div>
//       </div>
