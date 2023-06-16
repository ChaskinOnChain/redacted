"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function LoginHeading() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("No Theme Context");
  }

  const { isDark, toggle } = themeContext;
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
      <div
        onClick={toggle}
        className="border-4 px-2 py-1 rounded-2xl flex items-center justify-between gap-2 relative cursor-pointer"
      >
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faMoon} />
        <motion.div
          className="absolute rounded-full h-6 w-6 top-[2px] left-[5px] bg-sky-400"
          animate={{ x: isDark ? "110%" : "4%" }}
        ></motion.div>
      </div>
    </div>
  );
}

export default LoginHeading;
