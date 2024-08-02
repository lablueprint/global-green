'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

function LandingPage() {
  const router = useRouter();


  useEffect(() => {
  
      router.push('/landing')
  

  }, []);

  return (
    <>

    </>
  );
}
export default LandingPage;
