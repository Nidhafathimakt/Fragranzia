import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import UserService from "../../services/user-api-service/UserService";
import { FaGreaterThan } from "react-icons/fa6";

function AddAddress() {

  const { postAddressData, updateAddress } = UserService();
  const {
    address,
    setAddress,
    editAddress,
    setEditAddress,
    onAddress,
    onAccount,
    handleHome,
    fetchAddress
  } = useContext(ShopContext);

  useEffect(() => {
    if (editAddress) {
      setCurrent(editAddress); //  prefill form
    }
  }, [editAddress]);
  const [current, setCurrent] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrent({ ...current, [name]: value });
  };

 const handleSaveAddress = async (e) => {
  e.preventDefault();

  try {
    if (editAddress && editAddress._id) {
      // UPDATE
      await updateAddress(editAddress._id, current);

      setEditAddress(null);

      //  IMPORTANT: refresh list from backend
      await fetchAddress();

    } else {
      // CREATE
      await postAddressData(current);

      await fetchAddress();
    }

    // RESET FORM
    setCurrent({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });

    onAddress();

  } catch (error) {
    console.log(error);
  }
};

const handleCancel = () => {
  setCurrent({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  setEditAddress(null);

  onAddress();
};

  return (
    <div className="min-h-screen  py-10 px-10">
      <div className="max-w-5xl  p-6 md:p-2 ">
        

        <h1 className="text-2xl md:text-3xl font-bold text-[#00354B] mb-8 text-center md:text-left">
          Address info
        </h1>

        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          {/* Full Name */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={current.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={current.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          {/* Address Line 1 */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              placeholder="Flat / House No, Building Name, Street"
              value={current.addressLine1}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* Address Line 2 */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              placeholder="Area, Landmark, Floor (optional)"
              value={current.addressLine2}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          {/* City */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={current.city}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* State */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="Enter state"
              value={current.state}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          {/* Pincode */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Pincode
            </label>
            <input
              type="text"
              name="postalCode"
              placeholder="Enter pincode"
              value={current.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>

          {/* Country */}
          <div className="w-full">
            <label className="block text-gray-600 text-xl font-semibold mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={current.country}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
            />
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-[#00354B] mb-8 text-center md:text-left">
          Address Type
        </h1>

        <div className="flex gap-10">
          <button className="border rounded-full px-2 py-2 cursor-pointer">Home</button>
          <button className="border rounded-full px-2 py-2 cursor-pointer">Office</button>
          <button className="border rounded-full px-2 py-2 cursor-pointer">Other</button>
        </div>

        <p className="text-gray-400 font-light">
          Address type preference are used to plan your delivery. However,
          <br /> shipment can sometime arrive early or late that plan
        </p>

        {/* Button */}
       <div className="flex flex-col md:flex-row gap-5 justify-end">
  <button className="w-full md:w-auto bg-[#00354B] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#002737] transition cursor-pointer "
   onClick={handleCancel}>
    Cancel
  </button>

  <button
    onClick={handleSaveAddress}
    className="w-full md:w-auto bg-[#00354B] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#002737] transition cursor-pointer"
  >
    {editAddress ? "Update Address" : "Save Address"}
  </button>
</div>
      </div>
    </div>
  );
}

export default AddAddress;
