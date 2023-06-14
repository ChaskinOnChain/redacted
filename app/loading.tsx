"use client";

import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center">
      <motion.div
        className="border-t-4 border-blue-500 rounded-full w-28 h-28"
        style={{ borderRightColor: "transparent" }}
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 0.5, repeat: Infinity }}
      ></motion.div>
    </div>
  );
}

export default LoadingSpinner;
