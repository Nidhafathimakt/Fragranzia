import React, { useState } from "react";
import SideBar from "../../admin/SideBar";
import { HiMenu } from "react-icons/hi";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <SideBar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px] bg-white min-h-screen overflow-y-auto">

        {/* Mobile Header */}
        <div className="lg:hidden px-4 py-4 flex items-center border-b sticky top-0 bg-white z-40">
          <button onClick={() => setOpen(true)}>
            <HiMenu size={26} />
          </button>

          <h2 className="ml-4 text-lg font-semibold">
            Fragranzia
          </h2>
        </div>

        {/* Page Content */}
        <div className="p-5">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;