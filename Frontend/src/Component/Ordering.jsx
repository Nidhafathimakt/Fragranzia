import { useLocation, useNavigate } from "react-router-dom";
import CheckOut from "./CheckOut";
import { ImCheckmark2 } from "react-icons/im";

function Ordering() {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  const cartItems = item
    ? [
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
        },
      ]
    : [];
  return (
    <div className="relative">
      <div className="blur-xs">
        <CheckOut cartItems={cartItems} />
      </div>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="border border-gray-200 shadow-lg rounded-lg bg-white w-[400px] lg:w-[700px] h-[500px] flex flex-col justify-center items-center ">
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
            <button className="bg-[#00354B] text-white px-10 py-2 rounded font-semibold">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordering;
