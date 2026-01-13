import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { LuTruck } from "react-icons/lu";
import { BiCheckShield } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import ScrollProduct from "./ScrollProduct";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import Footer from "./Footer";
import { ShopContext } from "../context/ShopContext";

function Home() {
  const { data, addToCart, goToDetails } = useContext(ShopContext);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <div className="banner flex justify-center items-center bg-[#0a3c48] py-2">
        <h6 className="font-semibold text-base text-white">
          ENJOY FESTIVE DISCOUNTS! FREE SHIPPING ABOVE 999 !
        </h6>
      </div>

      <div className="container mx-auto relative overflow-hidden rounded-xl mt-4">
        <div
          className="flex transition-transform duration-1500 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
            height: "400px",
          }}
        >
          <div
            className="crosel-content w-full flex-shrink-0 flex items-center justify-between px-10 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, #14688dff 0%, #092632ff 100%)`,
            }}
          >
            <img
              src="/bab3135c7f2ed8a335cb9a00ac3c00ef33704e89.png"
              className="absolute bottom-0 left-0 w-full h-full object-cover opacity-30"
              alt="bg"
            />

            <div className="text-white max-w-md relative z-10">
              <h1 className="text-3xl font-bold mb-3">
                Discover perfumes that celebrate individuality
              </h1>
              <p className="mb-4">
                Every moment with an unforgettable essence.
              </p>
              <button className="bg-white text-black px-4 py-2 rounded">
                Shop Now
              </button>
            </div>

            <div className="carosel-perfume mx-5 md:mx-20 lg:mx-40 mt-10 relative h-[300px] md:h-[400px] lg:h-[450px] w-full">
              {/* FIRST IMAGE */}
              <img
                src="/008b0741afb5a356ca961785c67012d75bc3802b.png"
                alt="slide1"
                className="
      absolute z-10 -rotate-10 object-fill
      h-[200px] w-[400px] right-5           
      md:h-[400px] md:w-[300px] md:right-10 
      lg:h-[400px] lg:w-[400px] lg:-right-10 "
              />

              {/* SECOND IMAGE */}
              <img
                src="/008b0741afb5a356ca961785c67012d75bc3802b.png"
                alt="slide2"
                className="absolute z-20 rotate-15 object-fill h-[150px] -right-5 top-10 md:h-[250px] md:right-20 md:top-16 lg:h-[340px] lg:-right-40 lg:top-20 "
              />
            </div>
          </div>

          <div
            className="w-full flex-shrink-0 flex items-center justify-between px-10 relative overfolw-hidden"
            style={{
              background: `linear-gradient(90deg, #553a11ff , #C37400 )`,
            }}
          >
            <img
              src="/bab3135c7f2ed8a335cb9a00ac3c00ef33704e89.png"
              className="absolute bottom-0 left-0 w-full h-full object-cover opacity-30"
              alt="bg"
            />

            {/* TEXT */}
            <div className="text-white max-w-md relative z-10">
              <h1 className="text-3xl font-bold mb-3">
                Discover perfumes that celebrate individuality
              </h1>
              <p className="mb-4">
                Every moment with an unforgettable essence.
              </p>
              <button className="bg-white text-black px-4 py-2 rounded">
                Shop Now
              </button>
            </div>

            {/* PERFUME IMAGE */}
            <div className="carosel-perfume mx-5 md:mx-20 lg:mx-40 mt-10 relative h-[300px] md:h-[400px] lg:h-[450px] w-full">
              <img
                src="/eca718a09edd838874403cb7193d84d2765e110f.png"
                alt="slide2"
                className="absolute z-10 -rotate-10 object-fill h-[200px] w-[400px] right-5 md:h-[400px] md:w-[300px] md:right-10 lg:h-[400px] lg:w-[400px] lg:-right-10 "
              />
              <img
                src="/eca718a09edd838874403cb7193d84d2765e110f.png"
                alt="slide2"
                className="absolute z-20 rotate-15 object-fill h-[150px] -right-5 top-10 md:h-[250px] md:right-20 md:top-16 lg:h-[340px] lg:-right-40 lg:top-20 "
              />
            </div>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="container mx-auto  ">
        <div className="py-3 mt-4 flex flex-wrap items-center justify-center gap-8 px-4 sm:px-6 md:px-10">
          <div className="cards rounded-2xl flex items-center justify-between bg-white p-6 max-w-md max-h-52">
            <div>
              <h2 className="font-bold text-xl">
                Unlock Exclusive <br /> Offers
              </h2>
              <p className="text-gray-600">
                Discover special deals tailored just for you!
              </p>
            </div>
            <img
              src="/99a4784f39f68e5bc0205c10f49c812ed0cf44ba.jpg"
              className="w-[40%] object-contain"
              alt=""
            />
          </div>

          <div className="cards rounded-2xl p-6 max-w-md max-h-52 flex flex-col items-center text-center">
            <h2 className="font-bold text-xl leading-tight">
              Gift a Scents to your loved one.
            </h2>
            <p className="text-gray-600 mt-1 leading-tight">
              Make your love more beautiful
            </p>
            <img
              src="/07abda464afffff33f7d7bd5c5e8f4399c16deb3.png "
              className="w-52 "
              alt=""
            />
          </div>

          <div className="cards  item-center p-6 bg-white rounded-2xl max-w-md max-h-52 relative">
            <h2 className="font-bold text-xl leading-tight">
              Luxury Scents <br /> Starting at ₹4,000
            </h2>
            <div className="flex  justify-between gap-2">
              <div className="relative ">
                <img src="/Star 1.png" alt="" className="w-25 mt-5" />
                <p className="text-white absolute top-6 left-5 text-lg font-bold -rotate-40">
                  Shop Now
                </p>
              </div>

              <img
                src="/5a59d0411273b847b8af9755751370ea3f08ac3b.png"
                className="w-53  rotate-4 object-contain"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="
        max-w-[1550px]
        mx-5 sm:mx-auto
        py-6
        px-4 sm:px-6 lg:px-10
        mt-16
        border border-gray-300 rounded-lg shadow-sm bg-white"
      >
        <div
          className="
          flex
          flex-col
          sm:flex-row
          flex-wrap
          items-center
          justify-center
          gap-8 lg:gap-16
        "
        >
          {/* ITEM 1 */}
          <div className="flex items-start gap-4 max-w-sm">
            <LuTruck size={74} className="text-[#00354B]" />
            <div>
              <h2 className="font-bold text-xl md:text-2xl">
                Fast & Reliable Delivery
              </h2>
              <p className="text-base md:text-lg mt-2">
                Get your orders delivered <br /> on time every time.
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-start gap-4 max-w-sm">
            <BiCheckShield size={74} className="text-[#00354B]" />
            <div>
              <h2 className="font-bold text-xl md:text-2xl">Secure Payments</h2>
              <p className="text-base md:text-lg mt-2">
                Shop with confidence using our <br /> encrypted payment
                gateways.
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-start gap-4 max-w-sm">
            <BiSupport size={74} className="text-[#00354B]" />
            <div>
              <h2 className="font-bold text-xl md:text-2xl">
                24/7 Customer Support
              </h2>
              <p className="text-base md:text-lg mt-2">
                We're here to assist you anytime, <br /> anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="featured mt-15 px-20">
        <div className="Collection flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="text-2xl font-bold">Featured Collections</h2>
          <div className=" flex gap-2">
            <div className="border border-gray-300 w-[35px] h-[35px] rounded-full shadow-lg bg-white flex items-center justify-center cursor-pointer">
              <FaLessThan size={14} className="text-gray-700" />
            </div>

            <div className="border border-gray-300 w-[35px] h-[35px] rounded-full shadow-lg bg-white flex items-center justify-center cursor-pointer">
              <FaGreaterThan size={14} className="text-gray-700" />
            </div>
          </div>
        </div>
        <ScrollProduct
          data={data}
          addToCart={addToCart}
          goToDetails={goToDetails}
        />
      </div>

      <div className="mx-auto text-center mt-15 px-8 sm:px-6 md:px-10 max-w[900px]">
        <p className="text-xl md:text-3xl/11 text-black">
          "It's an art. A craft. A science. At Fragranza, we're in <br /> the
          business of creating memories that last forever <br />
          through our fragrances."
        </p>
      </div>
      <div className="category mt-5 px-20 max-[1024px]:px-10 max-[640px]:px-5">
        <div className="flex justify-between max-[640px]:flex-col max-[640px]:items-start gap-2">
          <h2 className="font-bold text-2xl">Explore Categories</h2>
          <a href="" className="underline">
            See All
          </a>
        </div>

        <div className="flex flex-wrap mt-5 gap-6 justify-center">
          {data.slice(0, 6).map((item) => (
            <div key={item.id}>
              <div className="border-2 border-gray-100 shadow-lg rounded-full p-6 max-[640px]:p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-40 h-40 object-contain max-[640px]:w-24 max-[640px]:h-24"
                />
              </div>
              <p className="text-center font-semibold mt-3">
                {item.title.slice(0, 11)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-35 px-20">
        <div className="Collection flex flex-col justify-between md:flex-row gap-3">
          <h2 className="text-2xl font-bold">Offers Zone</h2>
          <div className=" flex gap-2">
            <div className="border border-gray-300 w-[35px] h-[35px] rounded-full shadow-lg bg-white flex items-center justify-center cursor-pointer">
              <FaLessThan size={14} className="text-gray-700" />
            </div>

            <div className="border border-gray-300 w-[35px] h-[35px] rounded-full shadow-lg bg-white flex items-center justify-center cursor-pointer">
              <FaGreaterThan size={14} className="text-gray-700" />
            </div>
          </div>
        </div>
        <ScrollProduct
          data={data}
          addToCart={addToCart}
          goToDetails={goToDetails}
        />
      </div>
      <div className="mt-15 md:px-20 px-6">
        <div className="bg-perfume-banner relative flex md:flex-row flex-col w-full h-auto md:h-[250px] rounded-xl overflow-hidden">
          <div className="px-6 py-10 md:px-10 z-10">
            <h4 className="font-bold text-2xl md:text-3xl">
              Elegance in Every Bottle
            </h4>
            <p className="text-base md:text-lg mt-2">
              Discover timeless fragrances crafted for every moment
            </p>
            <button className="banner-btn text-white font-semibold mt-5 py-2 px-4 rounded">
              Shop Now
            </button>
          </div>
          <div className="relative w-full md:w-1/2 h-52 md:h-full">
            <img
              src="/2555a6e7d48237f6b1b24f19c4f8e70441955c33.jpg"
              className="absolute lg:ms-133 sm:left-5 sm:w-100 sm:h-100 md:w-120 md:h-80 w-full h-full object-cover rounded-xl"
              alt="perfume"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
