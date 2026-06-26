import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function Wishlist() {

  const {
    wishlistItems,
    removeWishlistItem,
    goToDetails,
    addToCart,
  } = useContext(ShopContext);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <h2 className="text-2xl font-semibold text-[#00354B]">
        Wishlist
      </h2>
      {wishlistItems.length === 0 ? (
        <p className="font-semibold text-2xl flex justify-center items-center py-20">
          Your wishlist is empty
        </p>
      ) : (

       wishlistItems?.map((item) => (

  <div
    key={item._id}
    className="border-2 border-gray-200 rounded-lg shadow-xl px-5 py-5 mt-5 flex flex-col lg:flex-row gap-5"
  >

    <div>

      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.title}
        onClick={() => goToDetails(item._id)}
        className="w-40 h-40 object-contain mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
      />

    </div>

    <div>

      <h3 className="font-semibold text-xl">
        {item.text}
      </h3>

      <div className="flex gap-5">

        <p className="font-bold text-lg mt-2">
          Rs {item.price}
        </p>

        <p className="mt-2 text-gray-500 line-through">
          Rs 200
        </p>

      </div>

      <div className="flex flex-col lg:flex-row gap-3">

        <button
          className="text-red-500 px-20 py-1 border-2 border-red-500 rounded mt-3 font-semibold cursor-pointer"
          onClick={() => removeWishlistItem(item._id)}
        >
          Delete
        </button>

        <button
          className="bg-[#00354B] text-white px-20 py-1 mt-3 rounded font-semibold cursor-pointer"
          onClick={() => addToCart(item._id)}
        >
          Add To Cart
        </button>

      </div>

    </div>

  </div>
))
    )}

    </div>

  );
}

export default Wishlist;