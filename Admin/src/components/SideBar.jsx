import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { GoPackage } from "react-icons/go";
import { FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function SideBar({open, setOpen}) {
 

  const link = ({isActive}) => `px-6 py-4 text-xl font-semibold border-b border-white/20 flex items-center gap-2 
  ${ 
    isActive ? "bg-white/20 text-white border-l-4 " : "text-white/80 hover:bg-white/10"
    }`;
    
  return (
    <div className={`fixed md:static z-50 h-screen w-70 sidebarItem transform transition-transform duration-300 ${open ? "translate-x-0": "-translate-x-full"} md:translate-x-0`}>
      <div className="sidebarItem flex items-center justify-between text-white px-6 py-8 border-b border-white/20  ">
        <h2 className="text-2xl font-semibold ">
          Fragranzia
        </h2>
        <button className="md:hidden" onClick={()=> setOpen(false)}>
          <IoClose size={24} />
        </button>
        </div>

          <nav className="flex flex-col">
          <NavLink to="/dashboard" className={link} onClick={() => setOpen(false)}>
          <IoMdHome />
          Dashboard
          </NavLink>
          <NavLink to="/user" className={link} onClick={() => setOpen(false)}>
          <FaUser />
          Users
          </NavLink>
          <NavLink to="/products" className={link} onClick={() => setOpen(false)}>
          <GoPackage />
          Products
          </NavLink>
          <NavLink to="/categories" className={link} onClick={() => setOpen(false)}>
         <FaListUl />
          Category
          </NavLink>

          </nav>
      
    </div>
  );
}

export default SideBar;