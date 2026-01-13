import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function Addresses() {
  const { savedAddress } = useContext(ShopContext);

  console.log("Addresses page data:", savedAddress);

  return (
    <div>
      <div className="border border-gray-100 shadow-lg rounded-lg py-10 px-10">
        <h1 className="text-3xl font-bold text-center mt-10">Addresses Page</h1>

        {(savedAddress?.length || 0) === 0 ? (
          <p className="text-center text-lg mt-5 text-gray-500">
            No addresses added yet.
          </p>
        ) : (
          savedAddress.map((addr, index) => (
            <div
              key={index}
              className="border border-gray-200 shadow-lg rounded-lg px-5 py-5 mt-3 w-[900px]"
            >
              <h2 className="font-bold text-2xl">{addr.fullName}</h2>
              <p className="mt-2 text-lg">{addr.address}</p>
              <p className="mt-5 text-lg">{addr.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Addresses;
