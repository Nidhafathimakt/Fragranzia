import React from "react";
import { GrInstagram } from "react-icons/gr";
import { PiFacebookLogoBold } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { TbBrandYoutube } from "react-icons/tb";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { BiEnvelope } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleProduct = () => {
    navigate("/Product");
  };
  const handleAbout = () => {
    navigate("/About");
  };
  const handleAccount = () => {
    navigate("/Account");
  };
  return (
    <>
      {/* <div className="footerBackground">
        
        <div className="md:px-20 tab:px-16 px-6 py-10 mt-10  tab:grid flex flex-col md:flex-row justify-between gap-10  md:gap-[140px]">
          <h2 className="font-bold text-3xl md:mt-20 text-center md:text-left">Fragranzia</h2>

          <div className="sm:flex  tab:grid tab:grid-cols-3 sm:flex-row gap-10 sm:gap-[80px]">
            <div> 
              <h6 className="text-xl font-semibold">Pages</h6>
              <div className="mt-6 leading-7">
                <p className="cursor-pointer" onClick={handleHome}>
                  Home
                </p>
                <p className="cursor-pointer" onClick={handleProduct}>
                  Products
                </p>
                <p className="cursor-pointer">Gifting</p>
                <p className="cursor-pointer" onClick={handleAbout}>
                  About
                </p>
                <p className="cursor-pointer" onClick={handleAccount}>
                  Profile
                </p>
              </div>
            </div>

            <div>
              <h6 className="font-semibold text-xl">Quick Links</h6>
              <div className="mt-3 leading-9 whitespace-nowrap">
                <p>Privacy policy</p>
                <p className="text-base/5">
                  Terms and <br />
                  conditions
                </p>
                <p>FAQs</p>
                <p className="text-base/5">
                  Customer <br /> service
                </p>
              </div>
            </div>

            <div>
              <p className="flex gap-3">
                <BiEnvelope className="mt-1" /> tfrarfurniture@gmail.com
              </p>
              <p className="flex gap-3 mt-1">
                <LuPhone className="mt-1" /> +91 9876543210
              </p>

              <h6 className="mt-4 font-bold text-lg">Social Media</h6>
              <div className="flex gap-3 text-lg mt-3">
                <GrInstagram size={20} />
                <PiFacebookLogoBold size={24} />
                <RiTwitterXFill size={20} />
                <TbBrandYoutube size={20} />
                <PiLinkedinLogoBold size={22} />
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-1 " />
        <div className="md:px-20 tab:px-16 px-6 py-3 flex flex-col tab:flex-col md:flex-row justify-between text-center md:text-left gap-3 ">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <p>Web Accessbility |</p>
            <p>Terms of Use |</p>
            <p>Privacy Statement |</p>
            <p>Contact Us</p>
          </div>
          <div className="text-sm">© 2024 fragranzia Company. All rights reserved.</div>
        </div>
      </div> */}

      <div className="footerBackground">
        {/* ---------------- MOBILE ONLY ---------------- */}
        <div className="block md:hidden">
          {/* MOBILE LAYOUT */}
          <div className="px-6 py-10 mt-10 flex flex-col gap-10">
            <h2
              className="font-bold text-3xl text-center cursor-pointer"
              onClick={handleHome}
            >
              Fragranzia
            </h2>

            <div>
              <h6 className="text-xl font-semibold">Pages</h6>
              <div className="mt-6 leading-7">
                <p className="cursor-pointer" onClick={handleHome}>
                  Home
                </p>
                <p className="cursor-pointer" onClick={handleProduct}>
                  Products
                </p>
                <p className="cursor-pointer">Gifting</p>
                <p className="cursor-pointer" onClick={handleAbout}>
                  About
                </p>
                <p className="cursor-pointer" onClick={handleAccount}>
                  Profile
                </p>
              </div>
            </div>

            <div>
              <h6 className="font-semibold text-xl">Quick Links</h6>
              <div className="mt-3 leading-7">
                <p>Privacy policy</p>
                <p>Terms & conditions</p>
                <p>FAQs</p>
                <p>Customer service</p>
              </div>
            </div>

            <div>
              <p className="flex gap-3">
                <BiEnvelope /> tfrarfurniture@gmail.com
              </p>
              <p className="flex gap-3 mt-1">
                <LuPhone /> +91 9876543210
              </p>

              <h6 className="mt-4 font-bold text-lg">Social Media</h6>
              <div className="flex gap-3 text-lg mt-3">
                <GrInstagram size={20} />
                <PiFacebookLogoBold size={24} />
                <RiTwitterXFill size={20} />
                <TbBrandYoutube size={20} />
                <PiLinkedinLogoBold size={22} />
              </div>
            </div>
          </div>

          {/* bottom */}
          <hr />
          <div className="px-6 py-3 flex flex-col text-center gap-3">
            <div className="flex flex-wrap justify-center gap-2">
              <p>Web Accessbility |</p>
              <p>Terms of Use |</p>
              <p>Privacy Statement |</p>
              <p>Contact Us</p>
            </div>
            <p className="text-sm">
              © 2024 fragranzia Company. All rights reserved.
            </p>
          </div>
        </div>

        {/* ---------------- TABLET ONLY ---------------- */}
        <div className="hidden md:block lg:hidden">
          {/* TABLET LAYOUT */}
          <div className="px-16 py-10 mt-10 grid grid-cols-3 gap-10">
            <h2 className="font-bold text-3xl">Fragranzia</h2>

            <div>
              <h6 className="text-xl font-semibold">Pages</h6>
              <div className="mt-6 leading-7">
                <p onClick={handleHome}>Home</p>
                <p onClick={handleProduct}>Products</p>
                <p>Gifting</p>
                <p onClick={handleAbout}>About</p>
                <p onClick={handleAccount}>Profile</p>
              </div>
            </div>

            <div>
              <h6 className="text-xl font-semibold">Quick Links</h6>
              <div className="mt-6 leading-7">
                <p>Privacy policy</p>
                <p>Terms & conditions</p>
                <p>FAQs</p>
                <p>Customer service</p>
              </div>
            </div>

            <div>
              <p className="flex gap-3">
                <BiEnvelope /> tfrarfurniture@gmail.com
              </p>
              <p className="flex gap-3 mt-1">
                <LuPhone /> +91 9876543210
              </p>

              <h6 className="mt-4 font-bold text-lg">Social Media</h6>
              <div className="flex gap-3 text-lg mt-3">
                <GrInstagram size={20} />
                <PiFacebookLogoBold size={24} />
                <RiTwitterXFill size={20} />
                <TbBrandYoutube size={20} />
                <PiLinkedinLogoBold size={22} />
              </div>
            </div>
          </div>

          <hr />
          <div className="px-16 py-3 text-center">
            <p>
              Web Accessbility | Terms of Use | Privacy Statement | Contact Us
            </p>
            <p className="text-sm mt-2">
              © 2024 fragranzia Company. All rights reserved.
            </p>
          </div>
        </div>

        {/* ---------------- DESKTOP ONLY ---------------- */}
        <div className="hidden lg:block">
          {/* DESKTOP LAYOUT */}
          <div className="px-20 py-10 mt-10 flex justify-between gap-20">
            <h2
              className="cursor-pointer font-bold text-3xl mt-10"
              onClick={handleHome}
            >
              Fragranzia
            </h2>

            <div className="flex gap-20">
              <div>
                <h6 className="text-xl font-semibold">Pages</h6>
                <div className="mt-6 leading-7">
                  <p className="cursor-pointer" onClick={handleHome}>
                    Home
                  </p>
                  <p className="cursor-pointer" onClick={handleProduct}>
                    Products
                  </p>
                  {/* <p>Gifting</p> */}
                  <p className="cursor-pointer" onClick={handleAbout}>
                    About
                  </p>
                  <p className="cursor-pointer" onClick={handleAccount}>
                    Profile
                  </p>
                </div>
              </div>

              <div>
                <h6 className="text-xl font-semibold">Quick Links</h6>
                <div className="mt-6 leading-7">
                  <p>Privacy policy</p>
                  <p>Terms & conditions</p>
                  <p>FAQs</p>
                  <p>Customer service</p>
                </div>
              </div>

              <div>
                <p className="flex gap-3">
                  <BiEnvelope /> tfrarfurniture@gmail.com
                </p>
                <p className="flex gap-3 mt-1">
                  <LuPhone /> +91 9876543210
                </p>

                <h6 className="mt-4 font-bold text-lg">Social Media</h6>
                <div className="flex gap-3 text-lg mt-3">
                  <GrInstagram size={20} />
                  <PiFacebookLogoBold size={24} />
                  <RiTwitterXFill size={20} />
                  <TbBrandYoutube size={20} />
                  <PiLinkedinLogoBold size={22} />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="px-20 py-3 flex justify-between text-sm">
            <p>
              Web Accessbility | Terms of Use | Privacy Statement | Contact Us
            </p>
            <p>© 2024 fragranzia Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
