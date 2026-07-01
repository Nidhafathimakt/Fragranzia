import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ShopContext } from "../../context/ShopContext";
import AdminService from "../../services/admin-api-service/AdminService";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { LiaRupeeSignSolid } from "react-icons/lia";


function Products() {
  const { deleteProductData } = AdminService();
  const { allProduct, setAllProduct } = useContext(ShopContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const onAddProduct = () => {
    navigate("/addProduct");
  };

  // const onHandleDelete = async (id) => {
  //   try {
  //     await deleteProductData(id);

  //     setAllProduct((prev) =>
  //       prev.filter((item) => item._id !== id)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onHandleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProductData(id);

    setAllProduct((prev) =>
      prev.filter((item) => item._id !== id)
    );

    // if last item of page deleted
    const remaining = filteredProducts.length - 1;
    const pages = Math.ceil(
      remaining / productsPerPage
    );

    if (currentPage > pages && pages > 0) {
      setCurrentPage(pages);
    }
  } catch (error) {
    console.log(error);
  }
};

  // Search
  const filteredProducts = allProduct.filter((item) =>
    item.text?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" p-3 md:p-4 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Products
          </h2>

          <p className="text-gray-500 text-sm">
            Manage and control all your products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-1 focus:ring-[#002737] focus:border-[#002737]"
            />
          </div>

          {/* Add Product */}
          <button
            onClick={onAddProduct}
            className="bg-[#00354B] hover:bg-[#002737] text-white px-5 py-2 rounded-lg"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Sale Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3 ">
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.text}
                        className="w-12 h-12 object-cover rounded"
                      />

                      <span className="font-medium">
                        {item.text}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    {item.category?.name}
                  </td>

                  <td className="p-4">
                    ₹{item.price}
                  </td>

                  <td className="p-4">
                    ₹{item.salePrice}
                  </td>

                  <td className="p-4">
                    {item.stock}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                       className="border border-[#00354B] text-[#00354B] hover:bg-[#002737] hover:text-white p-2 rounded-md transition"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() =>
                          onHandleDelete(item._id)
                        }
                       className="border border-red-300 text-red-500 p-2 rounded-md hover:bg-red-50 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 border-t">
            {/* Pagination */}
            <div className="flex  items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
                className={`border w-9 h-9 rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {"<"}
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handlePageChange(index + 1)
                  }
                  className={`w-9 h-9 rounded  ${
                    currentPage === index + 1
                      ? "bg-[#00354B] hover:bg-[#002737] text-white"
                      : "border"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
                className={`border w-9 h-9 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {">"}
              </button>
            </div>

            {/* Showing */}
            <div className="text-sm text-gray-500 justify-end">
              Showing{" "}
              {filteredProducts.length === 0
                ? 0
                : indexOfFirstProduct + 1}
              -
              {Math.min(
                indexOfLastProduct,
                filteredProducts.length
              )}{" "}
              of {filteredProducts.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;