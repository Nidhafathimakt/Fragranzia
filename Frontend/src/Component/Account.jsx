import React, { use, useContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FiPackage } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Wishlist from "./Wishlist";
import Addresses from "./Addresses";
import { ShopContext } from "../context/ShopContext";

function Account() {
  const { wishlistItems, setWishlistItems } = useContext(ShopContext);

  const [activeSection, setActiveSection] = useState("");
  return (
    <div>
      <Header className="border-b border-gray-300 shadow-lg" />
      <h2 className="px-10 mt-5 text-2xl font-semibold">My account</h2>
      <div className="px-10 py-10 flex gap-10 mb-10">
        <div className="border-2 border-gray-100 shadow-lg rounded-lg w-[400px] px-10 py-6">
          <h2 className="font-semibold text-2xl">Welcome, Rohan Jaison</h2>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex justify-between items-center p-3 hover:bg-neutral-200 rounded mt-2">
              <button className="text-left text-xl font-semibold hover:text-[#00354B]  flex items-center gap-2">
                <FiPackage />
                Orders
              </button>
              <span>
                <FaGreaterThan className="text-right text-gray-300" />
              </span>
            </div>
            <hr className="border-[0.5px] border-black/10 mt-2" />

            <div className="flex justify-between items-center p-3 hover:bg-neutral-200 rounded mt-2">
              <button
                className="text-left text-xl font-semibold hover:text-[#00354B] flex items-center gap-2"
                onClick={() => setActiveSection("wishlist")}
              >
                <IoMdHeartEmpty />
                My wishlist
              </button>
              <span>
                <FaGreaterThan className="text-right text-gray-300" />
              </span>
            </div>
            <hr className="border-[0.5px] border-black/10 mt-2" />

            <div className="flex justify-between items-center p-3 hover:bg-neutral-200 rounded mt-2">
              <button className="text-left text-xl font-semibold hover:text-[#00354B] flex items-center gap-2 ">
                <GoPerson />
                Personal data
              </button>
              <span>
                <FaGreaterThan className="text-right text-gray-300" />
              </span>
            </div>
            <hr className="border-[0.5px] border-black/10 mt-2" />

            <div className="flex justify-between items-center p-3 hover:bg-neutral-200 rounded mt-2">
              <button className="text-left text-xl font-semibold hover:text-[#00354B] flex items-center gap-2">
                <IoLockClosedOutline />
                Change password
              </button>
              <span>
                <FaGreaterThan className="text-right text-gray-300" />
              </span>
            </div>
            <hr className="border-[0.5px] border-black/10 mt-2" />

            <div className="flex justify-between items-center p-3 hover:bg-neutral-200 rounded mt-2">
              <button
                className="text-left text-xl font-semibold hover:text-[#00354B] flex items-center gap-2"
                onClick={() => setActiveSection("Addresses")}
              >
                <GoHome />
                Addresses
              </button>
              <span>
                <FaGreaterThan className="text-right text-gray-300" />
              </span>
            </div>
            <hr className="border-[0.5px] border-black/10 mt-2" />

            <div className="flex justify-between items-center p-3 hover:bg-neutral-200 rounded mt-2">
              <button className="text-left text-xl text-red-500 font-semibold hover:text-red-600 flex items-center gap-2">
                <PiSignOutBold />
                Logout
              </button>
              <span>
                <FaGreaterThan className="text-right text-gray-300" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {activeSection === "wishlist" ? (
            <Wishlist
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
            />
          ) : activeSection === "Addresses" ? (
            <Addresses />
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
