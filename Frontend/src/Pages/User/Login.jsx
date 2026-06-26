import React, { useContext, useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import LoginAndRegisterService from "../../services/loginAndrRegister-api-service/LoginAndRegisterService";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { postLogin } = LoginAndRegisterService();
  const { handleSignUp, setUser } = useContext(ShopContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postLogin(form);

      if (response?.success && response?.token) {
        const accessToken = response.token;
        const user = response.user;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setAuth({ accessToken, role: user.role, user });

        toast.success(response.message || "Login successful");

        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Something Went Wrong";
      toast.error(msg);
    }
  };

  return (
    <div className="flex px-4 justify-center items-center min-h-screen">
      <div className="overflow-hidden w-full max-w-6xl flex flex-col lg:flex-row gap-10 px-4 sm:px-8 lg:px-16 py-10">
        <div className="rounded-tl-[100px] rounded-br-[100px] lg:rounded-tl-[250px] lg:rounded-br-[250px] relative w-full lg:w-[640px] min-h-[240px] sm:min-h-[360px] lg:h-[590px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/9c74020bea95942fe85eb1d5ca6068cd932290d5.jpg')`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-center items-center text-white text-center px-6 h-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Welcome Back</h1>
            <p className="mt-4 text-sm sm:text-base lg:text-lg/6">
              Glad to see you again! Access your <br /> account to explore more
            </p>
          </div>
        </div>

        <div className="w-full max-w-md flex flex-col justify-center mx-auto lg:mb-20">
          <div className="flex items-center gap-3 lg:gap-4 mt-5">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-600">Sign in with email</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleLogin}>
            <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3 mt-4">
              <CgProfile className="text-xl" />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3 mt-4">
              <MdLockOutline className="text-xl" />
              <input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* <p className="text-xs text-gray-500 mt-3 text-center">
              Admin: admin@fragranzia.com / Admin@123
            </p> */}

            <p className="underline cursor-pointer text-right lg:ms-56 mt-3 underlineText">
              Forgot password?
            </p>

            <button
              className="buy-btn rounded-lg w-full py-3 text-white font-semibold mt-5"
              type="submit"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 flex gap-1 justify-center text-sm items-center">
            Don&apos;t have an account?
            <span className="underlineText cursor-pointer underline" onClick={handleSignUp}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
