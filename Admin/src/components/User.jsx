import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function User() {
  return (
    <>
    {/* header */}
      <div className="px-6 py-8 border-b border-black/10  ">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
      </div>

      {/* Page Content */}
      <div className="p-6 overflow-x-auto">
       
          <table className="w-full border border-balck-200">
            <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Registered</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" > <button onClick={() => change} className="px-4 py-1 rounded text-white bg-red-500 hover:bg-red-600">Block</button></td>
            </tr>
            <tr>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" > <button className="px-4 py-1 rounded text-white bg-red-500 hover:bg-red-600">Block</button> </td>
            </tr>
            <tr>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" ></td>
              <td className="p-3 border" > <button className="px-4 py-1 rounded text-white bg-red-500 hover:bg-red-600">Block</button> </td>
            </tr>
            </tbody>
          </table>
        
      </div>
    </>
  );
}

export default User;



