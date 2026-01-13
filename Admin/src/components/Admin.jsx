import React, { useState } from "react";
import SideBar from "./SideBar";
import { HiMenu } from "react-icons/hi";
import { Outlet } from "react-router-dom";

function Admin() {

  const [open,setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">

      {open &&(
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={()=> setOpen(false)}/>
      )}

      <SideBar open={open} setOpen={setOpen}/>

      {/* Main Content */}
      <div className="flex-1 bg-white ">

        <div className="md:hidden px-4 py-4 flex items-center border-b">
          <button onClick={()=> setOpen(true)}>
            <HiMenu size={26} />
          </button>
          <h2 className="ml-4 text-lg font-semibold">Fragranzia</h2>
        </div>
        <Outlet />
      </div>
      
    </div>
  );
}

export default Admin;
