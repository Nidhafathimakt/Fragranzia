import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminService from "../services/admin-api-service/AdminService";
import UserService from "../services/user-api-service/UserService";
import { AuthContext } from "./AuthContext";
import { requireAuth } from "../utils/authHelpers";

const API_URL = "http://localhost:5000/api";

export const ShopContext = createContext();


export const ShopProvider = ({ children }) => {
  // const {accessToken}= useContext(AuthContext)
  const {
    getProductData,
    getUserData,
    getCategoryData,
    addToCartData,
    getCartData,
    removeCart,
    addToWishlistData,
    getWishlistData,
    removeWishlist,
    updateCartQuantityData
  } = AdminService();
  const { getAddressData, deleteAddress, getOrder } = UserService();

  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [savedAddress, setSavedAddress] = useState([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [editAddress, setEditAddress] = useState(null)
  const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")) ||null);
  const [defaultAddress, setDefaultAddress] = useState(localStorage.getItem("defaultAddress") || null);
  const [orders, setOrders] = useState([])
  const [liked, setLiked] = useState([]);
  const [product, setProduct] = useState(null);
   const [selectedOrder, setSelectedOrder] = useState(null);
  const [inputData, setInputData] = useState({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "male",
    });
    const clearCart = () => setCartItems([]);
const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const requireLogin = () => requireAuth(auth, navigate);
 

const orderDetails = (order) => {
  setSelectedOrder(order);
  navigate("/account/orderDetails");
};

    const onAddAddress = () => {
    navigate("/account/addAddress");
  };

  const onAddress = () => {
    // navigate("/addresses");
    navigate("/account/addresses")
  }

  const onAccount = () => {
    navigate("/account")
  }
  const handleProduct = () => {
      navigate("/Product");
    };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCheckout = () => {
    if (!requireLogin()) return;
    navigate("/checkout");
  };

  const handleCart = () => {
    if (!requireLogin()) return;
    navigate("/Cart");
  };

  const handleHome = () => {
    navigate("/");
  };

  // const orderDetails = () => {
  //   navigate("/account/orderDetails")
  // }

  const onOrders = () => {
    navigate("/account/orders")
  }

  const handleBuy = (id) => {
    navigate(`/buyPage/${id}`);
  }
  // useEffect(() => {
  //   fetchProduct();
  //   fetchCategory();
  //   fetchUser();
  //   // fetchAddress();

  //   const accessToken = localStorage.getItem("token");
  //   // const userId = localStorage.getItem("userId");
    
  //   if (accessToken) {
  //     fetchCart();
  //     fetchWishlist();
  //     fetchAddress();
  //     fetchOrder();
  //   }
  // //   const userId = localStorage.getItem("userId");
  // //     console.log("userId:", userId);
  // // if (userId) {
    
  // // }

  // }, []);

  useEffect(() => {
  fetchProduct();
  fetchCategory();
}, []);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (auth?.accessToken && user?.role === "admin") {
    fetchUser();
  }
}, [auth?.accessToken]);

useEffect(() => {
  if (auth?.accessToken) {
    fetchCart();
    fetchWishlist();
    fetchAddress();
    fetchOrder();
  }
}, [auth?.accessToken]);

  //GET User
  const fetchUser = async () => {
    const res = await getUserData();
    setAllUser(res.users);
    // console.log(setAllUser,"userrr");
    
  };

  //  GET Product
  const fetchProduct = async () => {
    try {
      const res = await getProductData();
      setAllProduct(res?.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error(
        error.response?.data?.message ||
          "Cannot load products. Is the server running on port 5000?"
      );
      setAllProduct([]);
    }
  };

  // GET categories
  const fetchCategory = async () => {
    try {
      const res = await getCategoryData();
      setAllCategory(res?.categories || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setAllCategory([]);
    }
  };

// GET orders
const fetchOrder = async() => {
  try {
    const res = await getOrder()
    
  if (res.success){
    setOrders(res.orders)
  }
  } catch(error){
    console.log(error)
  }
}
  // ================================================= ADDRESS ===================================================

  // GET address
  // const fetchAddress = async () => {
  //   try {
  //     const res = await getAddressData();

  //     setAddress(res.addressInfo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

const fetchAddress = async () => {
  try {
    const res = await getAddressData();
    const addresses = res.addressInfo;

    setAddress(addresses);

    //  set first address as default if none selected
    // if (addresses.length > 0 && !defaultAddress) {
    //   setDefaultAddress(addresses[0]._id);
    // }

    const savedDefault = localStorage.getItem("defaultAddress");

if (!savedDefault && addresses.length > 0) {
  setDefaultAddress(addresses[0]._id);
  localStorage.setItem("defaultAddress", addresses[0]._id);
}
  } catch (error) {
    console.log(error);
  }
};

  // Delete Address
  const onDeleteAddress = async (id) => {
    let res = await deleteAddress(id);
    setAddress((prevItem) => prevItem.filter((item) => item._id !== id));
  };

  // Edit Address
  // const onEditAddress = async (id) => {
  //   navigate("/addAddress")
  //     setEditAddress(item._id)
     
  // };
  const onEditAddress = (item) => {
  setEditAddress(item);   //  store full object
  navigate("/account/addAddress");
};


const handleSetDefaultAddress = (id) => {
  setDefaultAddress(id);
  localStorage.setItem("defaultAddress", id);
};
  // =================================================== CART ====================================================

  // Fetch cart
  const fetchCart = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        console.log("No userId found in localStorage");
        return;
      }
      const res = await getCartData();

      setCartItems(res.cart || []);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  //  PRODUCT ADDED TO THE CART
  const addToCart = async (productId) => {
    if (!requireLogin()) return;
    try {
      if (!productId) return;

      const exist = cartItems.some(
        (item) => item?.product?._id === productId || item?.product === productId
      );
      if (exist) {
        toast.error("Item already in the cart");
        return;
      }

      await addToCartData({ productId });
      await fetchCart();
      toast.success("Added to Cart");
    } catch (error) {
      const msg = error.response?.data?.message || "Something Went Wrong";
      toast.error(msg);
    }
  };

  // DELETE CART ITEMS
  const removeCartItem = async (productId) => {
    try {
      if (!productId) return;
      const res = await removeCart({ productId });
      setCartItems(res.cart);

      fetchCart();
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };


const updateCartQuantity = async (productId, quantity) => {
  try {
    const res = await updateCartQuantityData({ productId, quantity });
    setCartItems(res.cart);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something Went Wrong");
  }
};

  // ================================================== WISHLIST  ===================================================

  // GET WISHLIST
  // const fetchWishlist = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("token");
  //     if (!accessToken) {
  //       return;
  //     }

  //     const res = await getWishlistData();
  //     setWishlistItems(res.wishlist || []);
  //     const likedIds = res.wishlist.map((item)=> item.product._id)
  //     setLiked(likedIds)
  //   } catch (error) {
  //     console.log(error.response?.data?.message || error.message);
  //   }
  // };


  // // Add To Whishlist
  // const addToWishlist = async (productId) => {
  //   try {
  //     // const accessToken = localStorage.getItem("token");
  //     // if (!productId) {
  //     //   return;
  //     // }

  //     // const exist = wishlistItems.some((item) => item.product._id === productId);
  //     const exist = liked.includes(productId);
  //     if (exist) {
  //       toast.error("Item already in the wishlist");
  //       return;
  //     }

  //     const res = await addToWishlistData({ productId });
  //     await fetchWishlist();
  //     // setLiked((prev)=>[...prev, productId])
  //     toast.success("Item added to wishlist successfully");
  //   } catch (error) {
  //     console.log("Add to wishlist error:", error.message);
  //   }
  // };

 
  // // Remove Wishlist
  // const removeWishlistItem = async (productId) => {
  //   try {
  //     if (!productId) return;
  //     const res = await removeWishlist({ productId });
  //     setWishlistItems(res.wishlist);

  //     fetchWishlist();
  //   } catch (error) {
  //     console.log(error.response?.data?.message || error.message);
  //   }
  // };
  // =============================== WISHLIST ===============================


// GET WISHLIST
const fetchWishlist = async () => {

  try {

    const accessToken = localStorage.getItem("token");

    if (!accessToken) return;

    const res = await getWishlistData();

    console.log("Wishlist:", res);

    const wishlistData = res?.wishlist || [];

    setWishlistItems(wishlistData);

    const likedIds = wishlistData.map(
      (item) => item._id
    );

    setLiked(likedIds);

  } catch (error) {

    console.log(
      error.response?.data?.message || error.message
    );

  }
};

// ADD TO WISHLIST
const addToWishlist = async (productId) => {
  if (!requireLogin()) return;
  try {
    if (!productId) return;
    if (liked.includes(productId)) {
      toast.error("Item already in wishlist");
      return;
    }
    await addToWishlistData({ productId });
    await fetchWishlist();
    toast.success("Added to Wishlist");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something Went Wrong");
  }
};

// REMOVE WISHLIST ITEM
const removeWishlistItem = async (productId) => {

  try {

    if (!productId) return;

    // REMOVE
    await removeWishlist({ productId });

    // UPDATE UI
    setWishlistItems((prev) =>
      prev.filter((item) => item?._id !== productId)
    );

    // UPDATE LIKED IDS
    setLiked((prev) =>
      prev.filter((id) => id !== productId)
    );

    // REFRESH
    await fetchWishlist();

    toast.error("Item removed from wishlist");

  } catch (error) {

    console.log(
      error.response?.data?.message || error.message
    );

  }
};
// TOGGLE WISHLIST
const toggleWishlist = async (productId) => {
  if (!requireLogin()) return;
  try {
    if (!productId) return;
    const exist = liked.includes(productId);
    if (exist) {
      await removeWishlist({ productId });
      toast.info("Removed from wishlist");
    } else {
      await addToWishlistData({ productId });
      toast.success("Added to Wishlist");
    }
    await fetchWishlist();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something Went Wrong");
  }
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
        options,
        setOptions,
        setData,
        setCartItems,
        setWishlistItems,
        setQuantity,
        setSavedAddress,
        setFullName,
        setAddress,
        setPhone,
        allProduct,
        setAllProduct,
        allCategory,
        setAllCategory,
        searchList,
        setSearchList,
        addToCart,
        toggleWishlist,
        goToDetails,
        handleSignUp,
        navigate,
        selected,
        setSelected,
        allUser,
        setAllUser,
        removeCartItem,
        removeWishlistItem,
        onDeleteAddress,
        onEditAddress,
        editAddress,
        setEditAddress,
        onAddAddress,
        onAddress,
        onAccount,
        handleCheckout,
        handleCart,
        requireLogin,
        handleHome,
        handleProduct,
        orderDetails,
        onOrders,
        handleBuy,
        updateCartQuantity,
        user,
        setUser,
        inputData, 
        setInputData,
        defaultAddress,
        orders,
        liked, 
        setLiked,
        product,
        setProduct,
        fetchAddress,
        fetchOrder,
        handleSetDefaultAddress,
        selectedOrder,
setSelectedOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
