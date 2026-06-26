import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const UserService = () => {

    const axiosPrivate = useAxiosPrivate()

  const getAddressData = async () => {
  const token = localStorage.getItem("token");

  const response = await axiosPrivate.get("/api/address", {
    headers: {
      Authorization: token, 
    },
  });

  return response.data;
};
    const postAddressData = async (data) => {
        const response = await axiosPrivate.post("/api/address",data);
        return response.data;
    }

    const deleteAddress = async (AddressId) => {
        const response = await axiosPrivate.delete(`/api/address/${AddressId}`);
        return response.data;
    };

    const updateAddress = async (id, data) => {
  const res = await axiosPrivate.put(`/api/address/${id}`, data);
  return res.data;
};

const postOrder = async (orderData) => {
  const response = await axiosPrivate.post("/api/orders",orderData);
  return response.data
}

const getOrder = async () => {
  const response = await axiosPrivate.get("/api/orders");
  return response.data;
}

const clearCartData = async () => {

  const token = localStorage.getItem("token");

  const response = await axiosPrivate.delete(
    "/api/cart/clear",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};
const verifyPayment = async (data) => {
  const response = await axiosPrivate.post("/api/cart/payment/verify-payment", data);
  return response.data;
};

const requestReturn = async (data) => {
  const response = await axiosPrivate.post("/api/returns", data);
  return response.data;
};

const getMyReturns = async () => {
  const response = await axiosPrivate.get("/api/returns/my");
  return response.data;
};

    return { 
       getAddressData,
       postAddressData,
       deleteAddress,
       updateAddress,
       postOrder,
       getOrder,
       clearCartData,
       verifyPayment,
       requestReturn,
       getMyReturns,
    };
};

export default UserService;