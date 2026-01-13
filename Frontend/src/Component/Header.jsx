import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { MdPersonOutline } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { ShopContext } from "../context/ShopContext";


function Header() {

  const { data,setSearchList } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchItems, setSearchItems] = useState("")
  // const search = (e) =>{
  //   const value = e.target.value;
  //   setSearchItems(value);
  //   const filtered = data.filter((item)=> 
  //   item.title.toLowerCase().includes(value.toLowerCase()));
  //   setSearchList(filtered)
  // }

  const handleSearch = () => {
  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(searchItems.toLowerCase())
  );
  setSearchList(filtered); // store the filtered products in context
  navigate("/search"); // navigate to Search page
};

  const handleClick = () => {
    navigate("/About");
  };
  const handleCart = () => {
    navigate("/Cart");
  };
  const handleProduct = () => {
    navigate("/Product");
  };
  const handleHome = () => {
    navigate("/home");
  };
  const handleAccount = () => {
    navigate("/Account");
  };
  const search = () => {
    setShowInput(!showInput)
  }
 
  return (
    <header className="sticky top-0 z-50 bg-light shadow-md bg-white">
      <nav
      >
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between">
          <div to="/" className="flex items-center ">
            <h1 className="text-4xl font-bold tracking-wider text-gray-800">
              Fragranzia
            </h1>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <p
              onClick={handleHome}
              className="cursor-pointer active font-semibold flex flex-col items-center hover:text-gray-900"
              style={{ color: "#00354B" }}
            >
              Home
            </p>

            <p
              onClick={handleProduct}
              className="cursor-pointer flex flex-col items-center hover:text-[#00354B]"
            >
              Products
            </p>
            <p className="cursor-pointer flex flex-col items-center text-black-900 hover:text-[#00354B]">
              
              Gifting
            </p>
            <p
              onClick={handleClick}
              className="cursor-pointer flex flex-col items-center hover:text-[#00354B]"
            >
              About
            </p>
            <div className="flex gap-2">
              <div className="relative">
                {/* <input
                  type="text"
                  onChange={search}
                  value={searchItems}
                  placeholder="Search Here"
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-300 shadow flex flex-col items-center text-gray-700 hover:text-[#00354B]"
                />
                <IoSearch
                  className="absolute left-3 top-3 -tanslate-y-1/2 flex flex-col items-center "
                  size={20}
                /> */}
                <input
  type="text"
  onChange={(e) => setSearchItems(e.target.value)}
  value={searchItems}
  placeholder="Search Here"
  className="py-2 pl-10 pr-4 rounded-full border border-gray-300 shadow text-gray-700"
/>

<IoSearch
  onClick={handleSearch}
  className="absolute left-3 top-3 cursor-pointer"
  size={20}
/>
              </div>
              <button className="icon cursor-pointer p-2 w-10 h-10 shadow border border-gray-300 rounded-full transition">
                <BiCart
                  onClick={handleCart}
                  className="text-2xl text-black-700 hover:text-white flex flex-col items-center "
                />
              </button>
              <button className="p-2 w-10 h-10 shadow border border-gray-300 rounded-full hover:bg-gray-100 transition">
                <IoNotificationsOutline className="text-2xl text-black-900 flex flex-col items-center" />
              </button>
              <button className="icon p-2 w-10 h-10 shadow border border-gray-300 rounded-full hover:bg-gray-100 transition">
                <MdPersonOutline
                  className="text-2xl text-black-700 hover:text-white flex flex-col items-center"
                  onClick={handleAccount}
                />
              </button>
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      </nav>
      {/* {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <p
              onClick={handleHome}
              className="cursor-pointer active font-semibold flex items-center text-gray-700 hover:text-gray-900"
              style={{ color: "#00354B" }}
            >
              Home
            </p>

            <p
              onClick={handleProduct}
              className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900"
            >
              Products
            </p>
            <p className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900">
              Gifting
            </p>
            <p
              onClick={handleClick}
              className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900"
            >
              About
            </p>

            <IoSearch 
            onClick={handleSearch}
            className="text-2xl text-black-700 hover:text-white flex items-center " />

            <BiCart
              onClick={handleCart}
              className="text-2xl text-black-700 flex items-center "
            />

            <IoNotificationsOutline className="text-2xl text-black-900 flex items-center" />

            <MdPersonOutline
              className="text-2xl text-black-700 flex items-center"
              onClick={handleAccount}
            />
          </div>
        </div>
      )} */}
      
     {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <p
              onClick={handleHome}
              className="cursor-pointer active font-semibold flex items-center text-gray-700 hover:text-gray-900"
              style={{ color: "#00354B" }}
            >
              Home
            </p>

            <p
              onClick={handleProduct}
              className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900"
            >
              Products
            </p>
            <p className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900">
              Gifting
            </p>
            <p
              onClick={handleClick}
              className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900"
            >
              About
            </p>

            <IoSearch 
            onClick={handleSearch}
            className="text-2xl text-black-700 hover:text-white flex items-center " />

            <BiCart
              onClick={handleCart}
              className="text-2xl text-black-700 flex items-center "
            />

            <IoNotificationsOutline className="text-2xl text-black-900 flex items-center" />

            <MdPersonOutline
              className="text-2xl text-black-700 flex items-center"
              onClick={handleAccount}
            />
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;
