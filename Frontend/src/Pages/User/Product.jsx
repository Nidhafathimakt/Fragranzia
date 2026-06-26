import React, { useContext, useEffect, useState } from "react";
import { FaSliders } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ShopContext } from "../../context/ShopContext";
import { isOutOfStock } from "../../utils/authHelpers";
import { getUploadUrl } from "../../axios";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscHeartFilled } from "react-icons/vsc";

function Product() {
  const { addToCart, goToDetails, allProduct, handleHome, liked, setLiked, product, setProduct, toggleWishlist} =
    useContext(ShopContext);

  return (
    <>
      <div>
        <div className="banner flex justify-center items-center bg-[#0a3c48] py-2">
          <h6 className="font-semibold text-base text-white">
            ENJOY FESTIVE DISCOUNTS! FREE SHIPPING ABOVE 999 !
          </h6>
        </div>
        <div className="mt-6 px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="font-semibold text-3xl md:text-4xl">All Products</h2>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm md:text-lg w-full md:w-auto">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-black-700">Sort By:</p>
                <p className="font-medium cursor-pointer">Relevence</p>
                <p className="cursor-pointer">Newest First</p>
                <p className="cursor-pointer">Popularty</p>
                <p className="cursor-pointer">Price -- Low to High</p>
                <p className="cursor-pointer">Price -- High to Low</p>
              </div>
              <button className="border-2 flex items-center gap-2 rounded-3xl py-1 px-5 font-semibold w-fit text-sm md:text-base">
                Filter
                <FaSliders className="text-lg md:text-xl" />
              </button>
            </div>
          </div>
          <div className="flex gap-1 mt-3 text-sm md:text-base">
            <div className="flex text-gray-400 gap-2">
              <p
                className="flex gap-2 items-center cursor-pointer "
                onClick={handleHome}
              >
                Home <FaGreaterThan className="mt-1" size={10} />
              </p>
              <p>Products</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-12 mt-10 mb-16">
          {(allProduct || []).map((product) => (
            <div key={product._id} className="grid mb-3 min-w-[220px]">
              <div className="card border-2 max-w-[300px] border-gray-200 rounded-tl-[70px] rounded-br-[70px] px-18 shadow-lg hover:rounded-tr-[70px] hover:rounded-bl-[70px] hover:rounded-tl-none hover:rounded-br-none flex ">
                <img
                  // src={item.image}
                  src={getUploadUrl(product.image)}
                  alt={product.title}
                  onClick={() => goToDetails(product._id)}
                  className="w-40 h-80 object-contain mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <div className="mt-5">
                <button
                                  // className="border-2 border-gray-100 shadow-lg rounded-full p-2"
                                  className="cursor-pointer"
                                 onClick={() => toggleWishlist(product._id)}
                                >
                                  {liked.includes(product._id) ? (
                                    <VscHeartFilled size={34} className="text-red-500 cursor-pointer" />
                                  ) : (
                                    <IoMdHeartEmpty
                                      size={34}
                                     
                                    />
                                  )}
                                </button>
                                </div>
              </div>
              <h3
                className="text-xl mt-1 text-black font-semibold mb-2 cursor-pointer"
                onClick={() => goToDetails(product._id)}
              >
                {/* {product.title.slice(0, 20)} */}
                {product.text}
              </h3>
              <p className="font-bold text-lg text-black mb-4">
                Rs {product.price}
              </p>
              <button
                disabled={isOutOfStock(product.stock)}
                className={`text-white font-semibold px-4 py-2 rounded ${
                  isOutOfStock(product.stock)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "cart-btn cursor-pointer"
                }`}
                onClick={() =>
                  !isOutOfStock(product.stock) && addToCart(product._id)
                }
              >
                {isOutOfStock(product.stock) ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="justify-center flex items-center ">
        <button className="border-2 rounded-base py-2 px-5 ">Load More</button>
      </div>
    </>
  );
}

export default Product;
