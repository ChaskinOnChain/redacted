import Image from "next/image";
import React from "react";

function UserAd() {
  return (
    <div className="p-4 border-4 rounded-md shadow-md xl:w-[450px]">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">Sponsered</h2>
        <h4 className="text-sm">Create Ad</h4>
      </div>
      <div className="w-full h-72 mt-2 relative">
        <Image
          className="rounded-md -z-30"
          fill={true}
          src="/socks.jpeg"
          alt="socks"
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <h2 className="font-bold">Socket</h2>
        <h4 className="text-sm">socket.com</h4>
      </div>
      <p className="mt-2">
        Socket: The perfect blend of comfort and style in every pair of socks.
        Make your feet happy today!
      </p>
    </div>
  );
}

export default UserAd;
