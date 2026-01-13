import React from "react";
import { IoIosArrowDown } from "react-icons/io";


function Dashboard() {
  return (
 
        <>
      
        <div className="px-6 py-8 flex justify-between border-b border-black/10">
          <h2 className="text-2xl font-semibold">Welcome back, Admin!</h2>

          <button className="border rounded-lg px-2 py-1 flex gap-2 items-center">
            Monthly Overview <IoIosArrowDown />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 flex space-x-10">

          <div className="border border-gray-200 shadow rounded px-2 py-2">
            <h2 className="text-black">Total product</h2>
            <p className="font-bold">2</p>
          </div>
          <div className="border border-gray-200 shadow rounded px-2 py-2">
            <h2 className="text-black">Total product</h2>
            <p className="font-bold">2</p>
          </div>
          <div className="border border-gray-200 shadow rounded px-2 py-2">
            <h2 className="text-black">Total product</h2>
            <p className="font-bold">2</p>
          </div>
          
          
        </div>
     </>
  );
}

export default Dashboard;