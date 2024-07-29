"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import convertToURL from "../convertToURL";
import { motion, AnimatePresence } from "framer-motion";
export default function Loading() {
    const center = {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-130px",
        marginLeft: "-50px",
    }
  return (
    <div style={center}>
          <motion.div
        className="block"
        animate={{
          rotate: 360,
        }}
        transition={{ ease: "linear", duration: 5, repeat: Infinity }}
      >
        <Image  width="425" height="300" src={convertToURL("earth.png")} />
      </motion.div>
      {/* Loading
      <Image width="1000" height="500" src={convertToURL("earth.png")} /> */}
    </div>
  );
}
