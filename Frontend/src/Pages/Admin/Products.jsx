import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import AdminService from "../../services/admin-api-service/AdminService";

const API_URL = "http://localhost:5000/api";

function Products() {
  const {deleteProductData} = AdminService()
  const { allProduct, setAllProduct } = useContext(ShopContext);
  const navigate = useNavigate();
  const onAddProduct = () => {
    navigate("/addProduct");
  };
console.log("allProducts==",allProduct)

 // Delete product
   const onHandleDelete = async (id) => {
    // let res = await axios.delete(`${API_URL}/products/${id}`);
    let res = await deleteProductData(id)
    setAllProduct((prevProduct) => prevProduct.filter((product) => product._id !== id));
   } 

  return (
    <>
      <div className="px-6 py-8 border-b border-black/10">
        <h2 className="text-2xl font-semibold">Manage Products</h2>

        {/* Add Product Button */}
        <div className="flex justify-end px-6 py-3">
          <button
            className="bg-[#00354B] text-white px-3 py-2 rounded"
            onClick={onAddProduct}
          >
            + Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto rounded shadow border border-gray-400">
          <table className="w-full text-base text-left border-collapse">
            <thead className="border-b border-gray-400">
              <tr className="bg-gray-100">
                
                
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Sale Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allProduct.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
                >
                  
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      className="w-12 h-12 object-cover rounded"
                    />
                    {item.text}
                  </td>
                  <td className="p-4">{item.category?.name}</td>
                  <td className="p-4 ">{item.price}</td>
                  <td className="p-4">{item.salePrice}</td>
                  <td className="p-4 ">{item.stock}</td>
                  
                  <td className="p-4 flex items-center gap-3">
                    <button className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                      Edit
                    </button>
                    <FiTrash2 className="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => onHandleDelete(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Products;
