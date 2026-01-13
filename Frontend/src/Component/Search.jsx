import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ShopContext } from "../context/ShopContext";

function Search() {
  const { searchList, goToDetails, addToCart } = useContext(ShopContext);

  return (
    <>
      <Header />

      <div className="px-6 md:px-12 mt-6">
        

        {searchList.length === 0 ? (
          <p className="text-lg text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {searchList.map((item) => (
              <div key={item.id} className="grid mb-3 min-w-[220px]">
                <div className="card border-2 flex items-center justify-center max-w-[300px] border-gray-200 rounded-tl-[70px] rounded-br-[70px] shadow-lg hover:rounded-tr-[70px] hover:rounded-bl-[70px] hover:rounded-tl-none hover:rounded-br-none ">
                  <img
                    src={item.image}
                    alt={item.title}
                    onClick={() => goToDetails(item.id)}
                    className="w-40 h-80 object-contain mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
                <h3
                  className="text-xl mt-1 text-black font-semibold mb-2 cursor-pointer"
                  onClick={() => goToDetails(item.id)}
                >
                  {item.title.slice(0, 20)}
                </h3>
                <p className="font-bold text-lg text-black mb-4">
                  Rs {item.price}
                </p>
                <button
                  className="cart-btn text-white font-semibold px-4 py-2 rounded"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Search;
