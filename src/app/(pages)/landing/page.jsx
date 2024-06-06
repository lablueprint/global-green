'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import CourseDisplay from './CourseDisplay';
import GardenModal from './GardenModal';
import ChallengeBadge from '@/app/components/snackBar';

function LandingPage() {
  const [gardenBadge, setGardenBadge] = useState(false);
  const [user, setUser] = useState({});
  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const { data: session } = useSession();

  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    console.log('data', data);

    setUser(data.user);
  };

  useEffect(() => {
    if (session) getUserDetails(session.user.id);
  }, [session]);
  const handleOpenGardenModal = () => {
    setIsGardenModalOpen(true);
    if (user.badges) {
      const badge = user.badges.find((badge) => badge.key === 'GardenStroll');
      if (!badge) {
        const response = fetch('/api/users/me/add-badge', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            badge: 'GardenStroll',
            seeds: 10,
          }),

        });
        setGardenBadge(true);
      }
    }
  };

  const handleCloseGardenModal = () => {
    setIsGardenModalOpen(false);
  };

  // seeing landing page banner
  return (
    <>
      <ChallengeBadge
        challengeName="Garden Stroll"
        challengePointValue="10"
        open={gardenBadge}
        handleClose={() => setGardenBadge(false)}
      />

      <div className={styles.landingPage}>
        {isGardenModalOpen && <GardenModal setIsGardenModalOpen={setIsGardenModalOpen} />}
        <div className={styles.welcome}>
          <h1>
            Welcome,
            {' '}
            <span className={styles.userName}>{session.user.userName}</span>
          </h1>
        </div>
        <div className={styles.banner}>
          <div className={styles.imageGarden}>
            {/* landing page image */}
            <Image
              className={styles.image}
              src={currentModule.imageUrl}
              alt="landing page Image"
              width={500}
              height={230}
              style={{ borderRadius: '10px' }}
            />
            {/* going to garden */}
            <div className={styles.garden}>
              <h2>Your Garden</h2>
              <div className={styles.gardenInfoContainer}>
                <div className={styles.gardenInfo}>Started on June 2024</div>
                <div className={styles.gardenInfo}>1 Plant collected</div>
                <div className={styles.gardenInfo}>3 Hours spent in total</div>
              </div>
              <div
                onClick={handleOpenGardenModal}
                className={styles.enterGarden}
              >
                Enter Garden
              </div>
            </div>
          </div>
        </div>
        <CourseDisplay />
      </div>
    </>
  );
}
export default LandingPage;
