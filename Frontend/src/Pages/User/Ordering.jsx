import { useLocation, useNavigate } from "react-router-dom";
import CheckOut from "../../Pages/User/CheckOut";
import { ImCheckmark2 } from "react-icons/im";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function Ordering() {
  const { handleHome, onOrders } = useContext(ShopContext);
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center ">
      <div className="bg-green-500 rounded-full w-40 h-40  flex items-center justify-center mb-15">
        <ImCheckmark2 className="text-white text-8xl" />
      </div>
      <h2 className="font-bold text-3xl">Thank You for Ordering!</h2>
      <p className="mt-5 font-semibold text-lg">
        Your order has been placed successfully.
      </p>
      <p className="font-semibold text-lg mb-5">
        We will notify you once it is shipped.
      </p>
      <div className="flex gap-2 mt-3">
        <button
          className="border-3 border-[#00354B] rounded px-10 py-2 text-black font-semibold"
          onClick={handleHome}
        >
          Back to Home
        </button>
        <button className="bg-[#00354B] text-white px-10 py-2 rounded font-semibold" onClick={onOrders}>
          Track Order
        </button>
      </div>
    </div>
  );
}

export default Ordering;
