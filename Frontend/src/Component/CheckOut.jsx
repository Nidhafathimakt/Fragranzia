import React, { useContext, useState } from "react";
import Header from "./Header";
import { IoCashOutline } from "react-icons/io5";
import { TbCreditCard } from "react-icons/tb";
import { BsBank } from "react-icons/bs";
import { useNavigate } from "react-router";
import { ShopContext } from "../context/ShopContext";

function CheckOut() {
  const {
    cartItems,
    fullName,
    setSavedAddress,
    setFullName,
    address,
    setAddress,
    phone,
    setPhone,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const { savedAddress } = useContext(ShopContext);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handlePay = () => {
    navigate("/ordering", { state: { item: cartItems[0] } });
  };

  const handleSavedAddress = (e) => {
    e.preventDefault();
    const newAddress = { fullName, address, phone };
    const updatedAddresses = [...savedAddress, newAddress];
    setSavedAddress(updatedAddresses);
    // console.log("Updated addresses:", updatedAddresses);
    setShowAddressForm(false);
    setFullName("");
    setAddress("");
    setPhone("");
  };
  return (
    <div>
      <Header className="border-b border-gray-300 shadow-lg" />
      <div className="flex flex-col lg:flex-row px-8 lg:px-10 mt-10 gap-45  ">
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 shadow-lg rounded-lg flex flex-col lg:flex-row items-center px-10 lg:px-10 py-5 mt-5 gap-5  lg:w-[900px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-50 h-50 object-contain"
              />
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <div className="border-2 rounded-lg py-1 px-2 w-20 justify-between flex gap-3 mt-3 ">
                  <button className="font-semibld">-</button>
                  <p className="font-bold">1</p>
                  <button className="font-semibold">+</button>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-5">
                  <p className="font-bold text-2xl mt-2">Rs {item.price} </p>
                  <p className="mt-4 text-gray-500 font-normal line-through">
                    Rs 200
                  </p>
                  <p className="text-green-600 font-bold text-sm mt-4">
                    61% off
                  </p>
                </div>
                <p>Delivered by August 29, Free delivery</p>
                <p className="text-green-500">7 day return policy</p>
              </div>
            </div>
          ))}

          <h2 className="font-bold text-2xl mt-5 ">Personal Details</h2>
          <div className="flex lg:flex-row gap-2 mt-3">
            <button
              className="bg-neutral-200 rounded px-5 py-2 text-black-500 font-semibold"
              onClick={() => setShowAddressForm(true)}
            >
              Add address+
            </button>
            {/* <button className="bg-[#00354B] text-white font-semibold px-5 py-2 rounded">
              Home
            </button>
            <button className="bg-neutral-200 rounded px-5 py-2 text-black-500 font-semibold">
              Office
            </button> */}
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold text-2xl mt-5">Address</h2>
            {showAddressForm && (
              <p
                className="mt-5 cursor-pointer"
                onClick={() => setShowAddressForm(true)}
              >
                Edit
              </p>
            )}
          </div>
          {showAddressForm && (
            <form
              onSubmit={handleSavedAddress}
              className="border border-gray-300 shadow-lg rounded-lg px-5 py-2 mt-3 w-[300px] lg:w-[900px]"
            >
              <h2>Add New Address</h2>
              <div className="flex flex-col mt-3">
                <label className="font-semibold mt-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="border rounded px-3 py-2 mt-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label className="font-semibold mt-2">Address</label>
                <textarea
                  placeholder="Enter your address"
                  className="border rounded px-3 py-2 mt-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <label className="font-semibold mt-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="border rounded px-3 py-2 mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#00354B] text-white px-5 py-2 rounded font-semibold mt-4"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {!showAddressForm &&
            savedAddress.length > 0 &&
            savedAddress.map((addr, index) => (
              <div
                key={index}
                className="border border-gray-200 shadow-lg rounded-lg px-5 py-5 mt-3 w-[900px]"
              >
                <h2 className="font-bold text-2xl">{addr.fullName}</h2>
                <p className="mt-2 text-lg">{addr.address}</p>
                <p className="mt-5 text-lg">{addr.phone}</p>
              </div>
            ))}
        </div>
        <div>
          <div className="border border-gray-100 shadow-lg rounded-lg px-5 py-5 mt-5 space-y-2 w-[330px] lg:w-[500px] ">
            <h2 className="font-bold text-2xl">Price Details </h2>
            <div className="flex lg:flex-row gap-18 lg:gap-59 mt-3 text-lg/7">
              <p className="">Price (1 items)</p>
              <p className="font-bold flex gap-2">
                Rs 800
                <span className="line-through text-gray-500 font-normal text-sm mt-1">
                  Rs 200
                </span>
              </p>
            </div>
            <p className="flex lg:flex-row gap-25 lg:gap-66 text-lg/7">
              Discount (61%) <span className="font-bold">Rs 1101</span>
            </p>
            <p className="flex lg:flex-row gap-13 lg:gap-54 text-lg/7">
              Delivery Charge
              <span className="text-green-800 font-semibold">
                Free Delivery
              </span>
            </p>
            <hr className="border-t-[0.5px] border-black/50 mt-5" />
            <p className="flex lg:flex-row gap-23  lg:gap-65 text-xl/7 font-bold mt-3">
              Total Amount <span>Rs 899</span>
            </p>
          </div>
          <div className="border border-gray-100 shadow-lg rounded-lg px-5 py-5 mt-5 w-[330px] lg:w-[500px]">
            <h2 className="font-bold text-2xl">Payment Methods</h2>
            <div className="flex flex-col gap-3 mt-3 accent-[#00354B]">
              <div className="flex lg:flex-row justify-between items-center font-semibold">
                <p className="flex lg:flex-row items-center gap-2 ">
                  <img
                    src="/OIP-removebg-preview.png"
                    className="w-10 h-10"
                    alt=""
                  />
                  Google Pay
                </p>

                <input type="radio" name="payment" className="" id="cod" />
              </div>

              <div className="flex lg:flex-row justify-between font-semibold ">
                <p className="flex gap-2">
                  <IoCashOutline className="mt-1" />
                  Cash on delivery (cash/UPI)
                </p>
                <input type="radio" name="payment" id="cod" />
              </div>
              <div className="flex justify-between font-semibold ">
                <p className="flex gap-2">
                  <img
                    src="/360_F_560501607_x7crxqBWbmbgK2k8zOL0gICbIbK9hP6y-removebg-preview.png"
                    className="w-5 h-5"
                    alt=""
                  />
                  Paytm/Phone pay/Amazon Pay etc
                </p>
                <input type="radio" name="payment" id="cod" />
              </div>
              <div className="flex justify-between font-semibold ">
                <p className="flex gap-2">
                  <TbCreditCard className="mt-1" /> Credit/Debit card
                </p>
                <input type="radio" name="payment" id="cod" />
              </div>
              <div className="flex justify-between font-semibold ">
                <p className="flex gap-2">
                  <BsBank className="mt-1" />
                  Net Banking
                </p>
                <input type="radio" name="payment" id="cod" />
              </div>
            </div>
            <button
              className="mt-5 bg-[#00354B] text-white px-4 py-2 rounded w-full font-semibold"
              onClick={handlePay}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
