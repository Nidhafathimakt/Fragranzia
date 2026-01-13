import { useContext } from "react";
import "./Styles/global.css";
import Home from "./Component/Home";
import Product from "./Component/Product";
import About from "./Component/About";
import Cart from "./Component/Cart";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import CheckOut from "./Component/CheckOut";
import Account from "./Component/Account";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Component/ProductDetails.";
import Wishlist from "./Component/Wishlist";
import Ordering from "./Component/Ordering";
import Addresses from "./Component/Addresses";
import Search from "./Component/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/ordering" element={<Ordering />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/search" element={<Search/>} />
      </Routes>

      <ToastContainer position="top-center" closeOnClick />
    </>
  );
}

export default App;
