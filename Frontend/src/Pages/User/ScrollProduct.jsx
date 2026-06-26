import React, { forwardRef, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { isOutOfStock } from "../../utils/authHelpers";
import { getUploadUrl } from "../../axios";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscHeartFilled } from "react-icons/vsc";

const ScrollProduct = forwardRef(function ScrollProduct(_props, ref) {
  const { addToCart, goToDetails, allProduct, liked, toggleWishlist } =
    useContext(ShopContext);

  return (
    <div
      ref={ref}
      className="flex mt-5 mx-auto gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth px-1"
    >
      {(allProduct || []).map((item) => (
        <div key={item._id} className="grid snap-center min-w-[220px] shrink-0">
          <div className="card border-2 border-gray-200 rounded-tl-[70px] rounded-br-[70px] p-10 shadow-lg hover:rounded-tr-[70px] hover:rounded-bl-[70px] hover:rounded-tl-none hover:rounded-br-none flex">
            <img
              src={getUploadUrl(item.image)}
              alt={item.text}
              onClick={() => goToDetails(item._id)}
              className="w-40 h-40 object-contain mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <div>
              <button type="button" onClick={() => toggleWishlist(item._id)}>
                {liked.includes(item._id) ? (
                  <VscHeartFilled size={34} className="text-red-500" />
                ) : (
                  <IoMdHeartEmpty size={34} />
                )}
              </button>
            </div>
          </div>

          <h3
            className="text-xl mt-1 text-black font-semibold mb-2 cursor-pointer"
            onClick={() => goToDetails(item._id)}
          >
            {item.text}
          </h3>

          <p
            className="font-bold text-lg text-black mb-4 cursor-pointer"
            onClick={() => goToDetails(item._id)}
          >
            Rs {item.price}
          </p>

          <button
            type="button"
            disabled={isOutOfStock(item.stock)}
            className={`text-white px-4 py-2 rounded font-semibold ${
              isOutOfStock(item.stock)
                ? "bg-gray-400 cursor-not-allowed"
                : "cart-btn cursor-pointer"
            }`}
            onClick={() => !isOutOfStock(item.stock) && addToCart(item._id)}
          >
            {isOutOfStock(item.stock) ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
});

export default ScrollProduct;
