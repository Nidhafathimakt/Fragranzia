import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../axios";

const AdminService = () => {
    const axiosPrivate = useAxiosPrivate();

// ======================================== Product management (public read) ========================================

    const getProductData = async () => {
        const response = await axios.get("/api/products");
        return response.data;
    };

    const postProductData = async (data) => {
        const response = await axiosPrivate.post("/api/products",data);
        return response.data;
    };

    const putProductData = async (ProductId, data) => {
        const response = await axiosPrivate.put(`/api/products/${ProductId}`, data);
        return response.data;
    };
    
    const deleteProductData = async (ProductId) => {
        const response = await axiosPrivate.delete(`/api/products/${ProductId}`);
        return response.data;
    };

    // const getSingleProduct = async () => {
    //     const response = await axiosPrivate.get("/api/products}")
    //     return response.data;
    // }


    // ================================================== Category =================================================

    const getCategoryData = async () => {
        const response = await axios.get("/api/categories");
        return response.data;
    };

    const postCategoryData = async (data) => {
        const response = await axiosPrivate.post("/api/categories",data);
        return response.data;
    }

     const putCategoryData = async (CategoryId, data) => {
        const response = await axiosPrivate.put(`/api/categories/${CategoryId}`, data);
        return response.data;
    };
    
    const deleteCategoryData = async (CategoryId) => {
        const response = await axiosPrivate.delete(`/api/categories/${CategoryId}`);
        return response.data;
    };


    // ====================================== User ==============================================================

    const getUserData = async () => {
        const response = await axiosPrivate.get("/api/user");
        return response.data;
    }

    const postUserData = async (data) => {
        const response = await axiosPrivate.post("/api/user",data);
        return response.data;
    }

    const putUserData = async (UserId, user) => {
        const response = await axiosPrivate.put(`/api/user/${UserId}`,user);
        return response.data;
    }

    const deleteUserData = async (UserId) => {
        const response = await axiosPrivate.delete(`/api/user/${UserId}`);
        return response.data;
    }

    // ============================================================ CART ===============================================

    const addToCartData = async (data) =>{
        const response = await axiosPrivate.post(`/api/cart`,data);
        return response.data;
    }

    const getCartData = async () => {
  const response = await axiosPrivate.get("/api/cart");
  return response.data;
};

const removeCart = async (data) => {
    const response = await axiosPrivate.delete("/api/cart", {data: data});
    return response.data;
}

const updateCartQuantityData = async (data) => {
  const response = await axiosPrivate.put("/api/cart", data);
  return response.data;
};

// =============================================== WISHLIST ============================================================

const addToWishlistData = async (data) => {
    const response = await axiosPrivate.post(`/api/wishlist`,data);
    return response.data;
}

const getWishlistData = async () => {
    const response = await axiosPrivate.get("/api/wishlist");
    return response.data;
}

const removeWishlist = async (data) => {
    const response = await axiosPrivate.delete("/api/wishlist", {data: data});
    return response.data;
}
const getOrder = async () => {
  const response = await axiosPrivate.get("/api/orders");
  return response.data;
};

const getAllOrders = async () => {
  const response = await axiosPrivate.get("/api/orders/admin/all");
  return response.data;
};

const updateOrderStatus = async (orderId, deliveryStatus) => {
  const response = await axiosPrivate.put(`/api/orders/status/${orderId}`, {
    deliveryStatus,
  });
  return response.data;
};

const getDashboardStats = async () => {
  const response = await axiosPrivate.get("/api/admin/dashboard");
  return response.data;
};

const toggleBlockUser = async (userId) => {
  const response = await axiosPrivate.put(`/api/user/${userId}/block`);
  return response.data;
};

const getAllReturns = async () => {
  const response = await axiosPrivate.get("/api/returns");
  return response.data;
};

const updateReturnStatus = async (orderId, data) => {
  const response = await axiosPrivate.put(`/api/returns/${orderId}`, data);
  return response.data;
};
    
    return { 
        getProductData,
        postProductData,
        putProductData,
        deleteProductData,
        getCategoryData,
        postCategoryData,
        putCategoryData,
        deleteCategoryData,
        getUserData,
        postUserData,
        putUserData,
        deleteUserData,
        addToCartData,
        getCartData,
        removeCart,
        addToWishlistData,
        getWishlistData,
        removeWishlist,
        updateCartQuantityData,
       getOrder,
       getAllOrders,
       updateOrderStatus,
       getDashboardStats,
       toggleBlockUser,
       getAllReturns,
       updateReturnStatus,
    };
};

export default AdminService;