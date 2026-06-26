import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";
import AdminService from "../../services/admin-api-service/AdminService";

function User() {
  const { deleteUserData, toggleBlockUser } = AdminService();
  const { allUser, setAllUser } = useContext(ShopContext);

  const onHandleDelete = async (id) => {
    try {
      await deleteUserData(id);
      setAllUser((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  const onToggleBlock = async (id) => {
    try {
      const res = await toggleBlockUser(id);
      toast.success(res.message);
      setAllUser((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, isActive: res.user?.isActive, status: res.user?.status }
            : u
        )
      );
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6 border-b border-black/10">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <div className="overflow-x-auto bg-white rounded shadow border border-gray-200">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.filter((u) => u.role !== "admin").map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  {user.image && (
                    <img
                      src={`http://localhost:5000/uploads/${user.image}`}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  )}
                  <span>{user.name}</span>
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4 text-gray-600">{user.phone || "—"}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.isActive !== false && user.status !== false
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive !== false && user.status !== false
                      ? "Active"
                      : "Blocked"}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-3">
                  <button
                    onClick={() => onToggleBlock(user._id)}
                    className={`px-3 py-1 text-sm text-white rounded ${
                      user.isActive !== false && user.status !== false
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {user.isActive !== false && user.status !== false
                      ? "Block"
                      : "Unblock"}
                  </button>
                  <FiTrash2
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => onHandleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!allUser?.length && (
          <p className="text-center py-8 text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}

export default User;
