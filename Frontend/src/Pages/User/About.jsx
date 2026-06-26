import React from "react";
import { useContext } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { ShopContext } from "../../context/ShopContext";

function About() {
 const {handleHome} = useContext(ShopContext)
  return (
    <>
      {/* <Header className="border-b border-gray-300 shadow-lg" /> */}

      <div className="about flex flex-col lg:flex-row justify-between gap-20 ps-10 pe-24 mt-10 ">
        <div className="aboutText">
          <h2 className="text-4xl font-semibold">About Fragranzia</h2>
          <div className="flex gap-1 mt-2">
            <div className="flex gap-2 text-gray-400">
            <p className="flex gap-2 cursor-pointer " onClick={handleHome}>
              Home <FaGreaterThan className="mt-2" size={10} />
            </p>
            <p>About</p>
            </div>
          </div>
          <div className="paragraph text-xl mt-4">
            <p>
              At Fragranzia, we believe that a perfume is more than just a
              scent—it’s a story, an art, and a science combined to create
              memories that linger. Our journey began with a vision to craft
              exquisite fragrances that capture the essence of individuality and
              elevate every moment into something timeless.
            </p>
            <br />
            <p>
              Guided by passion and precision, we source the finest ingredients
              from around the world to create perfumes that resonate with
              authenticity and luxury. Each bottle is a masterpiece,
              meticulously crafted to deliver an unparalleled sensory
              experience.
            </p>
            <br />
            <p>
              Our commitment goes beyond creating fragrances. We aim to inspire
              confidence, evoke emotions, and celebrate uniqueness through every
              drop we produce. Fragranzia isn’t just a brand—it’s a celebration
              of you, your style, and your moments.
            </p>
            <br />
            <p>
              With a legacy built on quality, artistry, and innovation, we
              invite you to explore our collection and find a scent that speaks
              your story.
            </p>
          </div>
        </div>
        <div className="aboutImage ">
          <img
            src="/9c74020bea95942fe85eb1d5ca6068cd932290d5.jpg"
            className="rounded-tl-[70px] rounded-br-[70px] w-80 lg:w-[700px] h-[300px]"
            alt=""
          />
          <img
            src="/ec25b4b5e08d65f5173c15e1f91cde6f71eb4f06.jpg"
            className="rounded-tr-[70px] rounded-bl-[70px] w-80 lg:w-full h-[300px]"
            alt=""
          />
        </div>
      </div>

    </>
  );
}

export default About;
