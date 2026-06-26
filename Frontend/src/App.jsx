import { useContext } from "react";
import "./Styles/global.css";

import Home from "./Pages/User/Home";
import Product from "./Pages/User/Product";
import About from "./Pages/User/About";
import Cart from "./Pages/User/Cart";
import Login from "./Pages/User/Login";
import SignUp from "./Pages/User/SignUp";
import CheckOut from "./Pages/User/CheckOut";
import Account from "./Pages/User/Account";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Pages/User/ProductDetails.";
import Wishlist from "./Pages/User/Wishlist";
import Ordering from "./Pages/User/Ordering";
import Addresses from "./Pages/User/Addresses";
import Search from "./Pages/User/Search";
import PersonalData from "./Pages/User/PersonalData";
import UserProtectedRoute from "./Component/protected-route/UserProtectedRoute";
import LoginAndSignupProtectedRoute from "./Component/protected-route/LoginAndSignupProtectedRoute";
import AdminProtectedRoute from "./Component/protected-route/AdminProtectedRoute";
import Returns from "./Pages/Admin/Returns";
import ReturnRequest from "./Pages/User/ReturnRequest";
import Dashboard from "./Pages/Admin/Dashboard";
// import { User } from "lucide-react";
import User from "./Pages/Admin/User";
import Products from "./Pages/Admin/Products";
import Categories from "./Pages/Admin/Categories";
import AddProduct from "./Pages/Admin/AddProduct";
import AddCategory from "./Pages/Admin/AddCategory";
import AddAddress from "./Pages/User/AddAddress";
import OrderDetails from "./Pages/User/OrderDetails";
import Orders from "./Pages/User/Orders";
import BuyPage from "./Pages/User/BuyPage";
import Order from "./Pages/Admin/Order"

function App() {
  
  return (
    <>
      <Routes>
    

        <Route element={<LoginAndSignupProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<UserProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckOut />} />
          {/* <Route path="/account" element={<Account />} /> */}
          
          <Route path="/ordering" element={<Ordering />} />
          {/* <Route path="/addresses" element={<Addresses />} /> */}
          <Route path="/search" element={<Search />} />
          {/* <Route path="/personaldata" element={<PersonalData />} />
          <Route path="/addAddress" element={<AddAddress/>} ></Route>
          <Route path="/orderDetails" element={<OrderDetails/>} ></Route>
          <Route path="/orders" element={<Orders/>}></Route> */}

  <Route path="/account" element={<Account />}>
  <Route index element={<PersonalData />} />
  <Route path="wishlist" element={<Wishlist/>}/>
    <Route path="addresses" element={<Addresses />} />
    <Route path="personaldata" element={<PersonalData />} />
    <Route path="addAddress" element={<AddAddress />} />
    <Route path="orders" element={<Orders />} />
    <Route path="orderDetails" element={<OrderDetails />} />
    <Route path="return/:orderId" element={<ReturnRequest />} />
  </Route>
          <Route path="/buyPage/:id" element={<BuyPage/>} ></Route>
        </Route>
        <Route element={<AdminProtectedRoute />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="addProduct" element={<AddProduct/>}/>
          <Route path="addCategory" element={<AddCategory/>} />
          <Route path="order" element={<Order/>}/>
          <Route path="returns" element={<Returns/>}/>
        </Route>
      </Routes>

      <ToastContainer position="top-center" closeOnClick />
    </>
  );
}

export default App;
