import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { getUploadUrl } from "../../axios";
import { isOutOfStock } from "../../utils/authHelpers";

function Search() {
  const { searchList, setSearchList, allProduct, goToDetails, addToCart } =
    useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    if (query.trim()) {
      const filtered = (allProduct || []).filter((item) =>
        (item.text || "").toLowerCase().includes(query.toLowerCase())
      );
      setSearchList(filtered);
    }
  }, [location.search, allProduct, setSearchList]);

  const results = searchList?.length ? searchList : [];

  return (
    <div className="px-6 md:px-12 mt-6 min-h-[50vh]">
      <h2 className="text-2xl font-semibold text-[#00354B] mb-6">Search Results</h2>
      {results.length === 0 ? (
        <p className="text-lg text-center text-gray-500 py-16">
          No products found. Try a different search term.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((item) => (
            <div key={item._id} className="grid mb-3">
              <div className="card border-2 flex items-center justify-center border-gray-200 rounded-tl-[70px] rounded-br-[70px] shadow-lg p-4">
                <img
                  src={getUploadUrl(item.image)}
                  alt={item.text}
                  onClick={() => goToDetails(item._id)}
                  className="w-40 h-60 object-contain cursor-pointer hover:scale-105 transition"
                />
              </div>
              <h3
                className="text-lg font-semibold mt-2 cursor-pointer"
                onClick={() => goToDetails(item._id)}
              >
                {item.text}
              </h3>
              <p className="font-bold text-lg mb-3">Rs {item.price}</p>
              <button
                type="button"
                disabled={isOutOfStock(item.stock)}
                className={`text-white font-semibold px-4 py-2 rounded ${
                  isOutOfStock(item.stock) ? "bg-gray-400" : "cart-btn"
                }`}
                onClick={() => !isOutOfStock(item.stock) && addToCart(item._id)}
              >
                {isOutOfStock(item.stock) ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
