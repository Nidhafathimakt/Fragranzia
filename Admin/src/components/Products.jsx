// import React, { useState } from 'react'
// import { IoIosArrowDown } from "react-icons/io";

// function Products() {

//   const [openForm, setOpenForm] = useState(false)

//   const addProduct = () => {
//     setOpenForm(!openForm)
//   }
//   return (
//   <>
//         <div className="px-6 py-8 border-b border-black/10">
//           <h2 className="text-2xl font-semibold">Manage Products</h2>
   
//         </div>

//         {/* Page Content */}

//         <div className="flex justify-end px-6 py-3">
          
//           <button className='bg-[#00354B] text-white px-2 py-1 rounded' onClick={addProduct}>+ Add Product</button>
//         </div>
//         <div className="p-6 overflow-x-auto">
//             <table className='w-full border border-black-200'>
//               <thead className='bg-gray-200'>
//                 <tr>
//                   <th className='p-3 border'>ID</th>
//                   <th className='p-3 border'>Category Name</th>
//                   <th className='p-3 border'>Products</th>
//                   <th className='p-3 border'>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                 </tr>
//                 <tr>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                 </tr>
//                 <tr>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                   <td className='p-3 border'></td>
//                 </tr>
//               </tbody>
//             </table>
//         </div>
//      </>
//   )
// }

// export default Products


import React, { useState } from 'react'


function Products() {
  const [openForm, setOpenForm] = useState(false)

  const products = [
    { id: 1, category: 'Electronics', name: 'Laptop' },
    { id: 2, category: 'Clothing', name: 'T-Shirt' },
    { id: 3, category: 'Books', name: 'React Guide' },
  ]

  return (
    <>
      <div className="px-6 py-8 border-b border-black/10">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-end px-6 py-3">
        <button
          className="bg-[#00354B] text-white px-3 py-2 rounded"
          onClick={() => setOpenForm(!openForm)}
        >
          + Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {openForm && (
        <div className="mx-6 mb-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Add New Product</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Category Name"
          />
          <input
            className="border p-2 mr-2"
            placeholder="Product Name"
          />
          <button className="bg-green-600 text-white px-3 py-2 rounded">
            Save
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border">{item.category}</td>
                <td className="p-3 border">{item.name}</td>

                <td className="p-3 border relative">
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products
