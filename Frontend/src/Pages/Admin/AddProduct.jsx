import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import AdminService from "../../services/admin-api-service/AdminService";


const API_URL = "http://localhost:5000/api";

function AddProduct() {
  const {postProductData} = AdminService()

  const {
    allProduct,
    setAllProduct,
    setOptions,
    selected,
    setSelected,
    allCategory,
  } = useContext(ShopContext);

  const [current, setCurrent] = useState({
    text: "",
    category: "",
    price: "",
    salePrice: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const onHandleChange = (e) => {
    setCurrent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onHandleSubmit = async () => {
    const formData = new FormData();
    formData.append("text", current.text);
    formData.append("category", selected);
    formData.append("price", current.price);
    formData.append("salePrice", current.salePrice);
    formData.append("stock", current.stock);
    formData.append("image", image);

    // let res = await axios.post(`${API_URL}/products`, formData);
    let res = await postProductData(formData)
    setAllProduct([...allProduct, res.data.product]);

    setCurrent({
      text: "",
      category: "",
      price: "",
      salePrice: "",
      stock: "",
    });
  };

  const fetchOptions = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setOptions(res.data);
    } catch (err) {
      console.error("Error fetching options:", err);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-10">
      <div className="max-w-5xl  p-6 md:p-2 ">
        <h1 className="text-2xl md:text-3xl font-bold text-[#00354B] mb-8 text-center md:text-left">
          Add New Product
        </h1>

        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          {/* Product Name */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="text"
              placeholder="Enter product name"
              value={current.text}
              onChange={onHandleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* Category */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Category
            </label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            >
              <option value="">Choose an option</option>
              {allCategory.map((opt) => (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          {/* Price */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              value={current.price}
              onChange={onHandleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* Sale Price */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Sale Price
            </label>
            <input
              type="text"
              name="salePrice"
              placeholder="Enter sale price"
              value={current.salePrice}
              onChange={onHandleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          {/* Stock */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              placeholder="Enter stock quantity"
              value={current.stock}
              onChange={onHandleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* Image */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Product Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 px-4 py-2 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#00354B] file:text-white hover:file:bg-[#002737]"
            />
          </div>
        </div>

        {/* Button */}
        <div className="text-center md:text-right">
          <button
            onClick={onHandleSubmit}
            className="w-full md:w-auto bg-[#00354B] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#002737] transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;