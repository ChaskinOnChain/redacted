"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function DarkLight() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("No Theme Context");
  }

  const { isDark, toggle } = themeContext;

  return (
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
  );
}

export default DarkLight;
