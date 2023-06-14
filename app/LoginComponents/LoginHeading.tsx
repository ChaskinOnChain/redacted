"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import DarkLight from "./DarkLight";
import Image from "next/image";

function LoginHeading() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("No Theme Context");
  }

  const { isDark } = themeContext;
  return (
    <div className="flex justify-center items-center gap-4 text-xl font-bold">
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
      Redacted
      <DarkLight />
    </div>
  );
}

export default LoginHeading;
