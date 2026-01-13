import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

function Categories() {
  return (
    <>
        <div className="px-6 py-8 border-b border-black/10">
          <h2 className="text-2xl font-semibold">Manage Catagory</h2>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-x-auto">
            <table className='w-full border border-black-200'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='p-3 border'>ID</th>
                  <th className='p-3 border'>Products</th>
                  <th className='p-3 border'>Category</th>
                  <th className='p-3 border'>Price</th>
                  <th className='p-3 border'>Stock</th>
                  <th className='p-3 border'>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                </tr>
                <tr>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                </tr>
                <tr>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                  <td className='p-3 border'></td>
                </tr>
              </tbody>
            </table>
        </div>
      
    </>
  )
}

export default Categories
