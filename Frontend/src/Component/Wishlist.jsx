import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ShopContext } from "../context/ShopContext";

function Wishlist() {
  const { wishlistItems, setWishlistItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const removeWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
  };
  return (
    <div>
      <div className="border border-gray-100 shadow-lg rounded-lg py-10 px-10">
        <div>
          <h2 className="text-4xl font-semibold">Wishlist</h2>

          {wishlistItems.length === 0 ? (
            <p className="font-semibold text-2xl flex justify-center items-center px-100 py-25">
              Your wishlist is empty
            </p>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="border-2 border-gray-200 rounded-lg shadow-xl px-5 py-5 mt-5 flex gap-5"
              >
                <div>
                  <img
                    src={item.image}
                    className="w-50 h-50 object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  {/* <div className="border-2 rounded-lg py-1 px-2 w-20 justify-between flex gap-3 mt-3 ">
                    <button className="font-semibld">-</button>
                    <p className="font-bold">1</p>
                    <button className="font-semibold">+</button>
                  </div> */}
                  <div className="flex gap-5">
                    <p className="font-bold text-lg mt-2">Rs {item.price} </p>
                    <p className="mt-2 text-gray-500 font-normal line-through">
                      Rs 200
                    </p>
                    <p className="text-green-600 font-bold text-sm mt-3">
                      61% off
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="remove-btn text-red-500 px-20 py-1 border-2 border-red-500 rounded mt-3 font-semibold"
                      onClick={() => removeWishlist(item.id)}
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
      </div>
    </div>
  );
}

export default Wishlist;
