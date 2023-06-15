import Image from "next/image";
import React from "react";

function Ad() {
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
          src="/makeup.jpg"
          alt="makeup"
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <h2 className="font-bold">LewithCosmetics</h2>
        <h4 className="text-sm">lewithcosmetics.com</h4>
      </div>
      <p className="mt-2">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </p>
    </div>
  );
}

export default Ad;
