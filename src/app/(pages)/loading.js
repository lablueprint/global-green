'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import convertToURL from '@/app/convertToURL';

export default function Loading() {
  const center = {
    position: 'absolute',
    top: '25vh',
    left: '36vw',
    // marginTop: '-130px',
    // marginLeft: '-50px',
  };
  return (
    <div style={center}>
      <motion.div
        className="block"
        animate={{
          rotate: 360,
        }}
        transition={{ ease: 'linear', duration: 5, repeat: Infinity }}
      >
        <Image
          width="425"
          height="300"
          src={convertToURL('earth.png')}
          alt="spinning globe to indicate loading"
        />
      </motion.div>
      {/* Loading
      <Image width="1000" height="500" src={convertToURL("earth.png")} /> */}
    </div>
  );
}
