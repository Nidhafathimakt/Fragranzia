import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FiTrash2 } from "react-icons/fi";

function Addresses() {
  const {
    address,
    fetchAddress,
    onAddAddress,
    onEditAddress,
    onDeleteAddress,
    defaultAddress,
    handleSetDefaultAddress,
  } = useContext(ShopContext);
  

  useEffect(() => {
    fetchAddress();
  }, []);

  

  return (
    // <div className="p-5">
    <div className="p-5 h-full overflow-y-auto scrollbar-hide">
      {/* Add Address Button */}
      <div className="flex justify-end">
        <button
          onClick={onAddAddress}
          className="bg-[#00354B] text-white px-4 py-2 rounded-md"
        >
          + Add Address
        </button>
      </div>

      {/* Address List */}
      {address?.length > 0 ? (
        address.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 shadow-lg rounded-lg px-5 py-5 mt-5 w-full"
          >
            {/* Right side buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 cursor-pointer"
                onClick={() => onEditAddress(item)}
              >
                Edit
              </button>

              <FiTrash2
                className="text-red-500 mt-2 cursor-pointer hover:text-red-600"
                onClick={() => onDeleteAddress(item._id)}
              />
            </div>

            {/* Address Data */}
            <h2 className="font-semibold text-base md:text-xl">
              {item.fullName}
            </h2>

            <p className="mt-2 text-lg text-black flex flex-wrap gap-2">
              <span>{item.addressLine1},</span>
              <span>{item.addressLine2}</span>
              <span>{item.city},</span>
              <span>{item.state},</span>
              <span>{item.country}</span>
              <span>{item.postalCode}</span>
            </p>

            <p className="mt-2 text-lg text-black">
              {item.phone}
            </p>

            {/* Primary Button */}
            <div className="mt-4">
              {defaultAddress === item._id ? (
                <button className="px-4 py-2 bg-[#00354B] text-white rounded-md">
                  Primary Address
                </button>
              ) : (
                <button
                 onClick={() => handleSetDefaultAddress(item._id)}
                  className="px-4 py-2 border border-[#00354B] hover:text-white rounded-md hover:bg-[#00354B]"
                >
                  Set as Primary
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="mt-5 text-red-500">No saved addresses</p>
      )}
    </div>
  );
}

export default Addresses;