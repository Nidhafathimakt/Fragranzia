// import React from "react";
// import { ShopContext } from "../../context/ShopContext";
// import axios, { all } from "axios";
// import { useContext } from "react";
// import { useState } from "react";
// import AdminService from "../../services/admin-api-service/AdminService";
// const API_URL = "http://localhost:5000/api";

// function AddUsers() {

//   const {postUserData} = AdminService()
//   const { allUser, setAllUser } = useContext(ShopContext);
//   const [image, setImage] = useState(null);
//   const [inputData, setInputData] = useState({
//     name: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//    status: "active",
//   });

//   const onHandleChange = (e) => {
//     setInputData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onHandleSubmit = async () => {

//     try {
//       const formData = new FormData();
//       formData.append("name", inputData.name);
//       formData.append("lastName",inputData.lastName);
//       formData.append("email",inputData.email)
//       formData.append("phone",inputData.phone);
//       formData.append("address",inputData.address);
//       formData.append("password",inputData.password);
//       formData.append("status",inputData.status)
//       formData.append("image",image)
//       let res = await axios.post(`${API_URL}/user`, formData);
//       // let res = await postUserData(formData)
//       setAllUser([...allUser, res.data.user]);
//       setInputData({
//         name: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         address: "",
//         password: "",
//         status: "active",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

 

//   return (
//     // <div className="px-10 py-8 bg-white min-h-screen">
//     //   <h1 className="text-3xl font-bold text-[#00354B] mb-6">Add new user</h1>
//     <div className="min-h-screen bg-gray-50 py-10 px-10">
//       <div className="max-w-5xl  p-6 md:p-2 ">
//         <h1 className="text-2xl md:text-3xl font-bold text-[#00354B] mb-8 text-center md:text-left">
//           Add New User
//         </h1>

//         {/* Row 1 */}
//         <div className="flex flex-col md:flex-row gap-10 mb-6">
//           {/* First Name */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               // className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               onChange={onHandleChange}
//             />
//           </div>

//           {/*Last Name */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Enter name"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               onChange={onHandleChange}
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="flex flex-col md:flex-row gap-10 mb-6">
//           {/* Email */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               onChange={onHandleChange}
//             />
//           </div>

//           {/* Password */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2"
//             //  className="block text-gray-500 font-semibold mb-2 text-xl"
//              >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               onChange={onHandleChange}
//             />
//           </div>
//         </div>

//         {/* Row 3 */}
//         <div className="flex flex-col md:flex-row gap-10 mb-6">
//           {/* Phone Number */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               name="phone"
//               placeholder="Enter phone number"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               onChange={onHandleChange}
//             />
//           </div>

//           {/* Address */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               placeholder="Enter address"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00354B] outline-none"
//               onChange={onHandleChange}
//             />
//           </div>
//         </div>

//         {/* Row 4 */}
//         <div className="flex flex-col md:flex-row gap-10 mb-6">
//           {/* Active */}
//        <div className="w-full">
//   <label className="block text-gray-600 text-xl font-semibold mb-2">
//     Status
//   </label>

//   <div className="flex items-center gap-6">
//     <label className="flex items-center gap-2 cursor-pointer">
//       <input
//         type="radio"
//         name="status"
//         value="active"
//         checked={inputData.status === "active"}
//         onChange={onHandleChange}
//       />
//       Active
//     </label>

//     <label className="flex items-center gap-2 cursor-pointer">
//       <input
//         type="radio"
//         name="status"
//         value="inactive"
//         checked={inputData.status === "inactive"}
//         onChange={onHandleChange}
//       />
//       Inactive
//     </label>
//   </div>
// </div>

//           {/* Image */}
//           <div className="w-full">
//             <label className="block text-gray-600 text-xl font-semibold mb-2">
//               Profile Image
//             </label>
//             <input
//               type="file"
//               // className="block w-full text-sm text-gray-500
//               //        file:mr-4 file:py-2 file:px-4
//               //        file:rounded file:border-0
//               //        file:text-sm file:font-semibold
//               //        file:bg-gray-300 file:text-gray-700
//               //        hover:file:bg-gray-100
//               //        cursor-pointer "
//                className="w-full border border-gray-300 px-4 py-2 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#00354B] file:text-white hover:file:bg-[#002737]"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </div>
//         </div>
//       </div>

//        {/* Button */}
//         <div className="text-center md:text-right">
//           <button
//             onClick={onHandleSubmit}
//             className="w-full md:w-auto bg-[#00354B] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#002737] transition"
//           >
//             Add User
//           </button>
//         </div>
//     </div>
//   );
// }

// export default AddUsers;
