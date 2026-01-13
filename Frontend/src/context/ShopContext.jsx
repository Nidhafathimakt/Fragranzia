import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [savedAddress, setSavedAddress] = useState([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [searchList, setSearchList] = useState([]);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((response) => response.json())
      .then((product) => setData(product));
  }, []);

  const addToCart = (id) => {
    const result = data.find((item) => item.id === id);
    const exist = cartItems.some((item) => item.id === id);

    if (!exist) {
      setCartItems([...cartItems, { ...result, quantity: 1 }]);
      toast.success("Item added to cart successfully");
    } else {
      toast.error("Item already in the cart");
    }
  };

  const addToWishlist = (id) => {
    const result = data.find((item) => item.id === id);
    const exist = wishlistItems.some((item) => item.id === id);

    if (!exist) {
      setWishlistItems([...wishlistItems, result]);
      toast.success("Item added to wishlist successfully");
    } else {
      toast.error("Item already in the wishlist");
    }
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <ShopContext.Provider
      value={{
        data,
        cartItems,
        wishlistItems,
        quantity,
        savedAddress,
        fullName,
        address,
        phone,

        setData,
        setCartItems,
        setWishlistItems,
        setQuantity,
        setSavedAddress,
        setFullName,
        setAddress,
        setPhone,

        
        searchList,
        setSearchList,

        addToCart,
        addToWishlist,
        goToDetails,
        handleSignUp,
        navigate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
