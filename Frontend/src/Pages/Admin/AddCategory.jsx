import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import AdminService from "../../services/admin-api-service/AdminService";
const API_URL = "http://localhost:5000/api";

function AddCategory() {

  const {postCategoryData} = AdminService()
  const { allCategory, setAllCategory } = useContext(ShopContext);
  const [inputData, setInputData] = useState({
    name: "",
    // parentCategory:"",
    description: "",
    status: "active"
  });

  const handleChange = (e) => {
    // setCurrent(e.target.value);
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async () => {
    try {
      // let res = await axios.post(`${API_URL}/categories`, inputData);
      let res = await postCategoryData(inputData)

      let updated = [...allCategory, res.data.categories];

      setAllCategory(updated);

      setInputData({
        name: "",
        description: "",
        status:"active"
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-10 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#00354B] mb-6">
        Add new category
      </h1>

      {/* Name */}
      <div className="mb-5">
        <label className="block text-gray-500 font-semibold mb-2 text-xl">
          Category
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          // value={current.text}
          className="w-96 border border-gray-400 px-3 py-2 rounded"
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-gray-500 font-semibold mb-2 text-xl">
          Description
        </label>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          className="w-96 border border-gray-400 px-3 py-2 rounded"
          // value={current.category}
          onChange={handleChange}
        />
      </div>

      <div className="w-full">
  <label className="block text-gray-600 text-xl font-semibold mb-2">
    Status
  </label>

  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="status"
        value="active"
        checked={inputData.status === "active"}
        onChange={handleChange}
      />
      Active
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="status"
        value="inactive"
        checked={inputData.status === "inactive"}
        onChange={handleChange}
      />
      Inactive
    </label>
  </div>
</div>

      {/* Button */}
      <button
        className="bg-[#00354B] text-white px-6 py-2 rounded-md font-semibold"
        onClick={handleSubmit}
      >
        Add Product
      </button>
    </div>
  );
}

export default AddCategory;
