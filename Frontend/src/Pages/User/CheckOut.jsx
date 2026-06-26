import React, { useContext, useState } from "react";
import { IoCashOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { ShopContext } from "../../context/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import UserService from "../../services/user-api-service/UserService";
import { getUploadUrl } from "../../axios";
import { TbCreditCard } from "react-icons/tb";
import { BsBank } from "react-icons/bs";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_URL = "http://localhost:5000/api";
function CheckOut() {
  const {
    cartItems,
    address,
    onAddAddress,
    onEditAddress,
    onDeleteAddress,
    setCartItems,
    defaultAddress,
    fetchOrder,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const { postOrder, clearCartData, verifyPayment } = UserService();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);

  const selectedAddress = address?.find((addr) => addr._id === defaultAddress);

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const formatAddressForOrder = (addr) => {
    if (!addr) return null;
    return {
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || "",
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
    };
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async (razorpayOrder) => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded || !razorpayKey) {
      toast.error("Online payment is not available. Please use Cash on Delivery.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Fragranzia",
      order_id: razorpayOrder.id,
      handler: async function (response) {
        try {
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (verifyRes.success) {
            await clearCartData();
            setCartItems([]);
            toast.success("Payment Successful");
            await fetchOrder?.();
            navigate("/ordering");
          } else {
            toast.error("Payment verification failed");
          }
        } catch {
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#00354B" },
    };

    new window.Razorpay(options).open();
  };

  const handleOrder = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please add and select a delivery address");
      return;
    }

    setPlacing(true);
    try {
      const orderData = {
        paymentMethod,
        orderItems: cartItems.map((item) => ({
          product: item.product._id,
          name: item.product.text,
          quantity: item.quantity,
          price: Number(item.product.price),
        })),
        totalPrice,
        shippingAddress: formatAddressForOrder(selectedAddress),
      };

      const res = await postOrder(orderData);

      if (res.success) {
        if (paymentMethod === "upi" && res.razorpayOrder) {
          await handlePayment(res.razorpayOrder);
        } else if (paymentMethod === "cod") {
          await clearCartData();
          setCartItems([]);
          toast.success("Order Placed Successfully");
          await fetchOrder?.();
          navigate("/ordering");
        } else {
          await clearCartData();
          setCartItems([]);
          toast.success(res.message || "Order placed successfully");
          await fetchOrder?.();
          navigate("/ordering");
        }
      } else {
        toast.error(res.message || "Something Went Wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something Went Wrong"
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row px-8 md:px-10 mt-10 gap-5 md:gap-12">
        <div className="flex flex-col flex-1">
          {cartItems.map((item) => (
            <div
              key={item.product?._id}
              className="border border-gray-200 shadow-lg rounded-lg flex flex-col md:flex-row items-center px-6 py-10 mt-5 gap-5 md:w-[900px]"
            >
              <img
                src={getUploadUrl(item.product?.image)}
                alt={item.product?.text}
                className="w-32 h-32 object-contain hover:scale-105 transition-transform duration-300 "
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{item.product?.text}</h2>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                 <div className="flex flex-col md:flex-row md:gap-5">
                <p className="font-bold text-xl mt-2">
                  Rs {Number(item.product?.price) * item.quantity}
                </p>
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

          <h2 className="font-bold text-2xl mt-5">Delivery Address</h2>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className="bg-neutral-200 rounded px-5 py-2 font-semibold cursor-pointer"
              onClick={onAddAddress}
            >
              Add address +
            </button>
          </div>

          {selectedAddress ? (
            <div className="border border-gray-200 shadow-lg rounded-lg px-5 py-10 mt-5 w-full md:w-[900px]">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 cursor-pointer"
                  onClick={() => onEditAddress(selectedAddress)}
                >
                  Edit
                </button>
                <FiTrash2
                  className="text-red-500 mt-2 cursor-pointer hover:text-red-600"
                  onClick={() => onDeleteAddress(selectedAddress._id)}
                />
              </div>
              <h2 className="font-semibold text-lg">{selectedAddress.fullName}</h2>
              <p className="mt-2 text-gray-600 flex flex-wrap gap-1">
                {selectedAddress.addressLine1}, {selectedAddress.addressLine2}{" "}
                {selectedAddress.city}, {selectedAddress.state},{" "}
                {selectedAddress.country} {selectedAddress.postalCode}
              </p>
              <p className="mt-2">{selectedAddress.phone}</p>
            </div>
          ) : (
            <p className="mt-5 text-red-500">No delivery address selected</p>
          )}
        </div>

        <div>
          <div className="border lg:sticky border-gray-100 shadow-lg rounded-lg px-5 py-5 mt-5 w-[330px] md:w-[450px]">
            <h2 className="font-bold text-2xl">Price Details</h2>
            <p className="flex justify-between mt-4">
              <span>Price ({cartItems.length} items)</span>
              <span className="font-bold">Rs {totalPrice}</span>
            </p>
            <p className="flex lg:flex-row gap-25 lg:gap-60 text-lg/7">
              Discount (61%) <span className="font-bold">Rs 0</span>
            </p>
            <p className="flex justify-between mt-2 ">
              <span>Delivery Charge</span>
              <span className="text-green-800 font-semibold">Free Delivery</span>
            </p>
            <hr className="my-4" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>Rs {totalPrice}</span>
            </p>
          </div>

          <div className="border border-gray-100  shadow-lg rounded-lg px-5 py-5 mt-5 w-full max-w-md">
            <h2 className="font-bold text-2xl">Payment Methods</h2>
            <div className="flex flex-col gap-3 mt-3">
              <label className="flex justify-between items-center font-semibold cursor-pointer">
                <span className="flex items-center gap-2">
                  <IoCashOutline className="mt-1" />
                  Cash on delivery
                </span>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </label>
              <label className="flex  justify-between items-center font-semibold cursor-pointer">
                <p className="flex lg:flex-row items-center gap-2">

                <img
                    src="/OIP-removebg-preview.png"
                    className="w-10 h-10"
                    alt=""
                  />Google Pay / UPI
                  </p>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </label>
            </div>
            <button
              type="button"
              disabled={placing}
              className="mt-5 bg-[#00354B] text-white px-4 py-3 rounded w-full font-semibold cursor-pointer disabled:opacity-60"
              onClick={handleOrder}
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
