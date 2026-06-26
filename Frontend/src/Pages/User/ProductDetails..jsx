import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
// import { FiShare2 } from "react-icons/fi";
import { VscHeartFilled } from "react-icons/vsc";
import { PiTagFill } from "react-icons/pi";
import { FaLessThan } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import ScrollProduct from "../../Pages/User/ScrollProduct";
import { ShopContext } from "../../context/ShopContext";
import { isOutOfStock, getStock } from "../../utils/authHelpers";
import axios, { getUploadUrl } from "../../axios";

function ProductDetails() {
  const {
    data,
    addToCart,
    toggleWishlist,
    goToDetails,
    navigate,
    allProduct,
    setAllProduct,
    handleHome,
    handleProduct,
    liked,
    setLiked,
    product,
    setProduct,
    } = useContext(ShopContext);

  const { id } = useParams();
  // const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
  }, [id]);

  // const [liked, setliked] = useState([]);

  if (!product) {
    return (
      <div className="p-12 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="flex gap-10">
          <div className="w-96 h-96 bg-gray-200 rounded" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const outOfStock = isOutOfStock(product.stock);
  const stockLeft = getStock(product.stock);

  return (
    <div>
      <div className="px-12">
        <div className="flex gap-2 mt-2 text-gray-500">
          <p className="flex gap-2 cursor-pointer " onClick={handleHome}>
            Home <FaGreaterThan className="mt-2" size={10} />
          </p>
          <p onClick={handleProduct} className="cursor-pointer">
            Products
          </p>
          <p className="flex gap-2">
            <FaGreaterThan className="mt-2" size={10} />
            {product?._id}
          </p>
        </div>
        <div className="flex gap-15 mt-10">
          <div>
            <div className="flex">
              <img
                src={getUploadUrl(product?.image)}
                alt={product.text}
                className="w-96 h-96 object-contain"
              />
              <div>
                <button
                  className="border-2 border-gray-100 shadow-lg rounded-full p-2 cursor-pointer"
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
                {/* <FiShare2
                  className="border-2 border-gray-100 shadow-lg rounded-full p-2 mt-2"
                  size={50}
                /> */}
              </div>
            </div>
            <button
              disabled={outOfStock}
              className={`border-2 rounded-lg px-10 w-full max-w-md py-3 mt-3 font-semibold text-base text-white flex justify-center items-center ${
                outOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "cart-btn cursor-pointer"
              }`}
              onClick={() => !outOfStock && addToCart(product?._id)}
            >
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          <div>
            <h2 className="font-semibold text-2xl">{product.text}</h2>
            <div className="flex gap-5 mt-2">
              <p className="flex gap-1">
                45 <FaStar className="text-green-500 mt-1" />{" "}
              </p>
              <p>1,000 Ratings </p>
            </div>

            <p className={`mt-2 font-medium ${outOfStock ? "text-red-600" : "text-orange-600"}`}>
              {outOfStock
                ? "Out of Stock"
                : stockLeft <= 5
                ? `Hurry! Only ${stockLeft} left in stock`
                : `${stockLeft} items available`}
            </p>
            <h2 className="font-bold text-2xl mt-5">Rs {product.price}</h2>
            {/* <div className='itemAdd border-3 rounded-lg py-1 px-2 w-20 justify-between flex gap-3 mt-3 '>
                      <button className='font-semibld'>-</button>
                      <p className='font-bold' >1</p>
                      <button className='font-semibold'>+</button>
                    </div> */}
            <p className="font-semibold text-lg mt-3">Delivery</p>
            <p className="mt-2 text-base">
              Delivery by 28 Aug, Wednesday | Free <br />
              if ordered before 9:24 PM
            </p>
            <p className="text-xl font-semibold mt-3">Description</p>
            <p className="text-lg mt-2">{product.description}</p>
            <p className="font-semibold text-lg mt-3">Available Offers</p>
            <p className="flex gap-2 mt-3">
              <PiTagFill className="text-green-500 mt-1" />
              <span>Buy two of the same product and get a third one free.</span>
            </p>
            <p className="flex gap-2">
              <PiTagFill className="text-green-500 mt-1" />
              <span>
                Enjoy free standard shipping on orders exceeding ₹1,399.
              </span>
            </p>
            <p className="flex gap-2">
              <PiTagFill className="text-green-500 mt-1" />{" "}
              <span>Get 15% off your first order </span>
            </p>
            <p className="flex gap-2">
              <PiTagFill className="text-green-500 mt-1" />
              <span>
                Receive a free tool case with the purchase of any perfume over
                ₹2,000
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-15 px-20">
        <div className="Collection flex justify-between">
          <h2 className="text-2xl font-bold">Suggested for you</h2>
          <div className="icon flex gap-2 ">
            <div className="border relative border-gray-300 w-[35px] h-[35px]  rounded-full shadow-6xl bg-white">
              <FaLessThan size={18} className="absolute ms-2 mt-2" />
            </div>
            <div className="border relative border-gray-300 w-[35px] h-[35px]  rounded-full shadow-6xl bg-white">
              <FaGreaterThan size={18} className="absolute mt-2 ms-2" />
            </div>
          </div>
        </div>
        <ScrollProduct />
      </div>
    </div>
  );
}

export default ProductDetails;
