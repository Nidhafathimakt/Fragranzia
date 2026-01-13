import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import { ShopContext } from "../context/ShopContext";

function Login() {
  const { handleSignUp } = useContext(ShopContext);

  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex px-4 justify-center items-center min-h-screen">
      <div className="overflow-hidden w-full max-w-6xl flex flex-col lg:flex-row gap-10  px-4 sm:px-8 lg:px-16 py-10">
        <div className="rounded-tl-[100px] rounded-br-[100px] lg:rounded-tl-[250px] lg:rounded-br-[250px] relative w-50% lg:w-[640px] min-h-[240px] sm:min-h-[360px] lg:h-[590px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
              url('/9c74020bea95942fe85eb1d5ca6068cd932290d5.jpg')
            `,
            }}
          ></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white text-center px-6 mt-25 lg:mt-5 h-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Welcome Back
            </h1>
            <p className="mt-4 text-sm sm:text-base lg:text-lg/6">
              Glad to see you again! Access your <br /> account to explore more
            </p>
          </div>
        </div>
        <div className="w-full max-w-md flex flex-col justify-center mx-auto lg:mb-20">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="border-2 flex items-center gap-2 justify-center rounded-lg lg:px-5  py-2 w-full lg:py-1">
              <img
                src="/sq-google-g-logo-update_dezeen_2364_col_0-removebg-preview.png"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>

            <button className="border-2 flex items-center justify-center gap-2 rounded-lg lg:px-5  lg:py-1 py-2 w-full itemAdd">
              <FaFacebookF className="lg:mt-1 text-blue-500" />
              Facebook
            </button>
          </div>

          <div className="flex items-center gap-3 lg:gap-4 mt-5">
            <hr className="flex-grow border-black-500 lg:w-23 lg:mt-3" />

            <span className="text-sm text-gray-600">Or sign In with email</span>
            <hr className="flex-grow border-black-500 lg:w-25 lg:mt-3" />
          </div>
          <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3 mt-4">
            <CgProfile className="text-xl" />
            <input
              type="text"
              placeholder="Enter your username"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3 mt-4">
            <MdLockOutline className="text-xl" />
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <p className="underline cursor-pointer text-right lg:ms-56 mt-3 underlineText">
            Forgot password?
          </p>
          <button
            className="buy-btn rounded-lg w-full sm:text-xl lg:px-40 py-3 text-white font-semibold mt-5"
            onClick={handleHome}
          >
            Log In
          </button>
          <p className="mt-4 flex gap-1 justify-center text-sm lg:text-lg sm:text-lg items-center">
            Don't have an account?
            <span
              className="underlineText cursor-pointer underline "
              onClick={handleSignUp}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
