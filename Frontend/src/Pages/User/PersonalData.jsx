import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
const API_URL = "http://localhost:5000/api";

function PersonalData() {
  const { setAllUser, user, setUser, inputData, setInputData } =
    useContext(ShopContext);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser) {
  //     setUser(storedUser);

  //     setInputData({
  //       name: storedUser?.name || "",
  //       lastName: storedUser?.lastName || "",
  //       email: storedUser?.email || "",
  //       phone: storedUser?.phone || "",
  //       gender: storedUser?.gender || "male",
  //     });
  //   }
  // }, []);
  const handleCancel = () => {
  setInputData({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "male",
  });

  setPreview(null);
  setImage(null);
  setIsEditing(false);
};

  useEffect(() => {
    if (user) {
      setInputData({
        name: user?.name || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        gender: user?.gender || "male",
      });
    } else {
      setInputData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "male",
      });
    }
  }, [user]);
  
  const onHandleChange = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onHandleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", inputData.name);
      formData.append("lastName", inputData.lastName);
      formData.append("email", inputData.email);
      formData.append("phone", inputData.phone);
      formData.append("gender", inputData.gender);

      if (image) {
        formData.append("image", image);
      }
      const res = await axios.put(`${API_URL}/user/${user._id}`, formData, {
        headers: {
          Authorization: token,
        },
      });
      const updatedUser = res.data.data;
      //  update profile
      setUser(updatedUser);
      //  update dashboard
      setAllUser((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
      );
      //  localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      setPreview(null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-5xl p-6 md:p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-[#00354B]">
          Personal Information
        </h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Change Profile Information
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              className="px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
              // onClick={() => setIsEditing(false)}
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-[#00354B] text-white rounded-md hover:bg-[#00354B]-700 cursor-pointer"
              // onClick={() => setIsEditing(false)}
              onClick={onHandleSubmit}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Profile Image */}

      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32">
          <img
            src={
              preview
                ? preview
                : user?.image
                  ? `http://localhost:5000/uploads/${user.image}?t=${Date.now()}`
                  : ""
            }
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
{isEditing && (
          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
            ✏️
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!isEditing}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file); // send this to backend
                  setPreview(URL.createObjectURL(file)); // preview only
                }
              }}
            />
          </label>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        {/* First Name */}
        <div>
          <label className="font-semibold text-xl text-[#00354B]">
            First Name
          </label>
          <input
            type="text"
            name="name"
            value={inputData.name}
            placeholder="First Name"
            disabled={!isEditing}
            onChange={onHandleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 disabled:bg-gray-100"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="font-semibold text-xl text-[#00354B]">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            value={inputData.lastName}
            name="lastName"
            disabled={!isEditing}
            onChange={onHandleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 disabled:bg-gray-100"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="font-semibold text-xl text-[#00354B]">
            Date of Birth
          </label>
          <input
            type="date"
            disabled={!isEditing}
            onChange={onHandleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 disabled:bg-gray-100"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="font-semibold text-xl text-[#00354B]">Gender</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 ">
              <input
                type="radio"
                value="male"
                className="cursor-pointer"
                checked={inputData.gender === "male"}
                name="gender"
                onChange={onHandleChange}
                disabled={!isEditing}
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                className="cursor-pointer"
                value="female"
                checked={inputData.gender === "female"}
                onChange={onHandleChange}
                disabled={!isEditing}
              />
              Female
            </label>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="font-semibold text-xl text-[#00354B]">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={inputData.phone}
            placeholder="Phone Number"
            disabled={!isEditing}
            onChange={onHandleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-xl text-[#00354B]">Email</label>
          <input
            type="email"
            name="email"
            value={inputData.email}
            placeholder="Email"
            disabled={!isEditing}
            onChange={onHandleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalData;
