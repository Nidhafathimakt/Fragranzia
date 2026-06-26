import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { MdPersonOutline } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { allProduct, setSearchList, handleCart, requireLogin, wishlistItems, cartItems } =
    useContext(ShopContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchItems, setSearchItems] = useState("");

  const handleSearch = () => {
    const query = searchItems.trim();
    if (!query) return;
    const products = allProduct || [];
    const filtered = products.filter((item) =>
      (item.text || "").toLowerCase().includes(query.toLowerCase())
    );
    setSearchList(filtered);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleHome = () => navigate("/");
  const handleProduct = () => navigate("/Product");
  const handleAbout = () => navigate("/About");

  const handleAccount = () => {
    if (!requireLogin()) return;
    navigate("/account");
  };

  const handleWishlist = () => {
    if (!requireLogin()) return;
    navigate("/account/wishlist");
  };

  const handleLogin = () => navigate("/login");

  const cartCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  const wishlistCount = wishlistItems?.length || 0;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            onClick={handleHome}
            className="text-2xl sm:text-4xl font-bold tracking-wider text-gray-800 cursor-pointer"
          >
            Fragranzia
          </h1>

          <div className="hidden lg:flex items-center gap-6">
            <p onClick={handleHome} className="cursor-pointer font-semibold hover:text-[#00354B]">
              Home
            </p>
            <p onClick={handleProduct} className="cursor-pointer hover:text-[#00354B]">
              Products
            </p>
            <p onClick={handleAbout} className="cursor-pointer hover:text-[#00354B]">
              About
            </p>

            <div className="relative">
              <input
                type="text"
                value={searchItems}
                onChange={(e) => setSearchItems(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search perfumes..."
                className="py-2 pl-10 pr-4 rounded-full border border-gray-300 shadow outline-none w-48 xl:w-64"
              />
              <IoSearch
                size={20}
                onClick={handleSearch}
                className="absolute left-3 top-3 cursor-pointer"
              />
            </div>

            <button
              onClick={handleWishlist}
              className="relative p-2 w-10 h-10 border border-gray-300 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <IoMdHeartEmpty className="text-2xl mx-auto" />
              {auth?.accessToken && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={handleCart}
              className="relative p-2 w-10 h-10 border border-gray-300 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <BiCart className="text-2xl mx-auto" />
              {auth?.accessToken && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00354B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {auth?.accessToken ? (
              <button
                onClick={handleAccount}
                className="p-2 w-10 h-10 border border-gray-300 rounded-full shadow hover:bg-gray-100 cursor-pointer"
              >
                <MdPersonOutline className="text-2xl mx-auto" />
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-5 py-2 bg-[#00354B] text-white rounded-md hover:bg-[#002737] transition cursor-pointer"
              >
                Login
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4">
          <div className="flex flex-col gap-5">
            <p onClick={handleHome} className="cursor-pointer font-semibold">Home</p>
            <p onClick={handleProduct} className="cursor-pointer">Products</p>
            <p onClick={handleAbout} className="cursor-pointer">About</p>
            <input
              type="text"
              value={searchItems}
              onChange={(e) => setSearchItems(e.target.value)}
              placeholder="Search..."
              className="border rounded-lg px-3 py-2"
            />
            <IoSearch onClick={handleSearch} className="text-2xl cursor-pointer" />
            <div className="flex gap-6">
              <div className="relative cursor-pointer" onClick={handleWishlist}>
                <IoMdHeartEmpty className="text-2xl" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="relative cursor-pointer" onClick={handleCart}>
                <BiCart className="text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00354B] text-white text-xs px-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
            {auth?.accessToken ? (
              <MdPersonOutline onClick={handleAccount} className="text-2xl cursor-pointer" />
            ) : (
              <button onClick={handleLogin} className="w-fit px-5 py-2 bg-[#00354B] text-white rounded-md">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
