// import React, { useContext } from "react";
// import { FiPackage } from "react-icons/fi";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { GoHome, GoPerson } from "react-icons/go";
// import { PiSignOutBold } from "react-icons/pi";
// import { FaGreaterThan } from "react-icons/fa6";
// import { useNavigate, Outlet, useLocation } from "react-router-dom";

// import { ShopContext } from "../../context/ShopContext";
// import useAuth from "../../hooks/useAuth";

// function Account() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { setUser, user, inputData } = useContext(ShopContext);
//   const { setAuth } = useAuth();

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     setAuth({});
//     navigate("/");
//   };

//   const MenuItem = ({ icon, label, path, danger, onClick }) => (
//     <>
//       <div
//         onClick={onClick ? onClick : () => navigate(path)}
//         className={`flex justify-between items-center p-3 rounded cursor-pointer
//         ${
//           location.pathname === path
//             ? "bg-neutral-200"
//             : "hover:text-[#00354B]"
//         }`}
//       >
//         <span
//           className={`text-sm sm:text-base lg:text-xl font-semibold flex items-center gap-2
//           ${danger ? "text-red-500 hover:text-red-600" : ""}`}
//         >
//           {icon}
//           {label}
//         </span>

//         {!danger && (
//           <FaGreaterThan className="text-gray-300 hidden sm:block" />
//         )}
//       </div>

//       <hr className="border-[0.5px] border-black/10 mt-2" />
//     </>
//   );

//   return (
//     <div>
//       {/* <div className="px-10 py-10 flex flex-col lg:flex-row gap-10 mb-10"> */}
//       <div className="px-10 py-10 flex flex-col lg:flex-row gap-10 mb-10 h-screen overflow-hidden">
//         {/* Sidebar */}
//         {/* <div className="border-2 border-gray-100 shadow-lg rounded-lg w-full lg:w-[400px] px-10 py-6"> */}
//         <div className="border-2 border-gray-100 shadow-lg rounded-lg w-full lg:w-[400px] px-10 py-6 h-fit lg:sticky lg:top-5">
//           {/* <div className="flex space-x-10"> */}
//           <div className="flex space-x-10 overflow-y-auto">
//             <img
//               src={
//                 user?.image
//                   ? `http://localhost:5000/uploads/${user.image}?t=${Date.now()}`
//                   : ""
//               }
//               alt="profile"
//               className="rounded-full w-20 h-20"
//             />

//             <div className="py-4">
//               <h2 className="font-semibold text-sm sm:text-lg">Welcome</h2>

//               <div className="flex gap-2 font-semibold text-lg">
//                 <p>{inputData.name}</p>
//                 <p>{inputData.lastName}</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 mt-5">
//             <MenuItem
//               icon={<FiPackage />}
//               label="Orders"
//               path="/account/orders"
//             />

//             <MenuItem
//               icon={<IoMdHeartEmpty />}
//               label="Wishlist"
//               path="/account/wishlist"
//             />

//             <MenuItem
//               icon={<GoPerson />}
//               label="Personal data"
//               path="/account/personaldata"
//             />

//             <MenuItem
//               icon={<GoHome />}
//               label="Address"
//               path="/account/addresses"
//             />

//             <MenuItem
//               icon={<PiSignOutBold />}
//               label="Logout"
//               danger
//               onClick={handleLogout}
//             />
//           </div>
//         </div>

//         {/* Nested Page Content */}
//         <div className="flex-1 p-4 sm:p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Account;
import React, { useContext, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHome, GoPerson } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { ShopContext } from "../../context/ShopContext";
import useAuth from "../../hooks/useAuth";

function Account() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser, user, inputData } = useContext(ShopContext);
  const { setAuth } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setAuth({});
    navigate("/");
  };

  const MenuItem = ({ icon, label, path, danger, onClick }) => (
    <>
      <div
        onClick={() => {
          if (onClick) onClick();
          if (path) navigate(path);
          setOpenMenu(false); // close mobile menu only
        }}
        className={`flex justify-between items-center p-3 rounded cursor-pointer
        ${
          location.pathname === path
            ? "bg-neutral-200"
            : "hover:text-[#00354B]"
        }`}
      >
        <span
          className={`text-sm sm:text-base lg:text-xl font-semibold flex items-center gap-2
          ${danger ? "text-red-500 hover:text-red-600" : ""}`}
        >
          {icon}
          {label}
        </span>

        {!danger && (
          <FaGreaterThan className="text-gray-300 hidden sm:block" />
        )}
      </div>

      <hr className="border-[0.5px] border-black/10 mt-2" />
    </>
  );

  return (
    <div className="min-h-screen">
      
      
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <h2 className="font-bold text-lg">Account</h2>

        <button
          onClick={() => setOpenMenu(true)}
          className="text-2xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* Main Layout */}
      <div className="px-4 lg:px-10 py-6 lg:py-10 flex flex-col lg:flex-row gap-10 mb-10">

        
        {openMenu && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setOpenMenu(false)}
          />
        )}

        
        <div
          className={`
            border-2 border-gray-100 shadow-lg rounded-lg
            w-[280px] lg:w-[400px] px-10 py-6 h-fit lg:sticky lg:top-5
            fixed lg:relative top-0 left-0 z-50 bg-white
            transform transition-transform duration-300
            ${openMenu ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          {/* Profile */}
          <div className="flex space-x-10">
            <img
              src={
                user?.image
                  ? `http://localhost:5000/uploads/${user.image}?t=${Date.now()}`
                  : ""
              }
              alt="profile"
              className="rounded-full w-20 h-20"
            />

            <div className="py-4">
              <h2 className="font-semibold text-sm sm:text-lg">
                Welcome
              </h2>

              <div className="flex gap-2 font-semibold text-lg">
                <p>{inputData.name}</p>
                <p>{inputData.lastName}</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-2 mt-5">
            <MenuItem
              icon={<FiPackage />}
              label="Orders"
              path="/account/orders"
            />

            <MenuItem
              icon={<IoMdHeartEmpty />}
              label="Wishlist"
              path="/account/wishlist"
            />

            <MenuItem
              icon={<GoPerson />}
              label="Personal data"
              path="/account/personaldata"
            />

            <MenuItem
              icon={<GoHome />}
              label="Address"
              path="/account/addresses"
            />

            <MenuItem
              icon={<PiSignOutBold />}
              label="Logout"
              danger
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* 🔥 Content (NOW SCROLLS PROPERLY) */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Account;