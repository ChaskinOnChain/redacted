"use client";

import { ThemeContext } from "@/app/ThemeContext/ThemeContext";
import Image from "next/image";
import React, { useContext } from "react";

function Logo() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("No Theme Context");
  }

  const { isDark } = themeContext;
  return (
    <div className="relative h-12 w-12">
      <Image
        className={` transition-opacity duration-500 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
        fill={true}
        src="/logolight.png"
        alt="light logo"
      />
      <Image
        className={`absolute top-0 left-0 transition-opacity duration-500 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
        fill={true}
        src="/logodark.png"
        alt="dark logo"
      />
    </div>
  );
}

export default Logo;
