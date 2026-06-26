import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router";
import { FiTrash2 } from "react-icons/fi";
import axios, { all } from "axios";
import AdminService from "../../services/admin-api-service/AdminService";
const API_URL = "http://localhost:5000/api";

function Categories() {
  const { deleteCategoryData } = AdminService();
  const { allCategory, setAllCategory } = useContext(ShopContext);
  const navigate = useNavigate();
  const onAddCategory = () => {
    navigate("/addCategory");
  };

  // Delete category
  const onHandleDelete = async (id) => {
    // let res = await axios.delete(`${API_URL}/categories/${id}`);
    let res = await deleteCategoryData(id);
    setAllCategory((prevItem) => prevItem.filter((item) => item._id !== id));
  };

  return (
    <>
      <div className="px-6 py-8 ">
        <h2 className="text-2xl font-semibold">Manage Catagory</h2>
        {/* Add Product Button */}
        <div className="flex justify-end px-6 py-3">
          <button
            className="bg-[#00354B] text-white px-3 py-2 rounded"
            onClick={onAddCategory}
          >
            + Add Category
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto rounded shadow border border-gray-400">
          <table className="w-full text-base text-left border-collapse">
            <thead className="border-b border-gray-400">
              <tr className="bg-gray-100">
                <th className="p-4">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allCategory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="p-4 ">{item.name}</td>
                  <td className="p-4">{item.description}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      {item.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                      Edit
                    </button>
                    <FiTrash2
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => onHandleDelete(item._id)}
                    />
                  </td>
                  {/* <td className="p-4">{item.parentCategory}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Categories;
