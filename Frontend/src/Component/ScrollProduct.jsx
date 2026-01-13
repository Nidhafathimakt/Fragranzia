import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function ScrollProduct() {
  const { data, addToCart, goToDetails } = useContext(ShopContext);

  return (
    <>
      <div className="flex mt-5 mx-auto gap-6 overflow-x-auto snap-x scrollbar-hide">
        {data.map((item) => (
          <div key={item.id} className="grid snap-center min-w-[220px]">
            <div className="card border-2 border-gray-200 rounded-tl-[70px] rounded-br-[70px] p-10 shadow-lg hover:rounded-tr-[70px] hover:rounded-bl-[70px] hover:rounded-tl-none hover:rounded-br-none ">
              <img
                src={item.image}
                alt={item.title}
                onClick={() => goToDetails(item.id)}
                className="w-40 h-40 object-contain mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
            <h3
              className="text-xl mt-1 text-black font-semibold mb-2 cursor-pointer"
              onClick={() => goToDetails(item.id)}
            >
              {item.title.slice(0, 20)}
            </h3>
            <p
              className="font-bold text-lg text-black mb-4 cursor-pointer"
              onClick={() => goToDetails(item.id)}
            >
              Rs {item.price}
            </p>
            <button
              className="cart-btn text-white text-semibold px-4 py-2 rounded font-semibold"
              onClick={() => addToCart(item.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ScrollProduct;
