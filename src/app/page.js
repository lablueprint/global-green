'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LandingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
    router.push('/landing');
  }, []);

  return (
    <>

    </>
  );
}
export default LandingPage;
