'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import CourseDisplay from './CourseDisplay';
import GardenModal from './GardenModal';

function LandingPage() {
  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState([]);
  const { data: session } = useSession();

  const getCourseProgress = async (id) => {
    if (!id) return;
    const response = await fetch(
      '/api/users/course/progress',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );

    const data = await response.json();
    setCourseProgress(data.courseProgress);
  };

  useEffect(() => {
    if (session) getCourseProgress(session.user.id);
  }, [session]);

  // seeing landing page banner
  return (
    <div className={styles.landingPage}>
      {isGardenModalOpen && <GardenModal setIsGardenModalOpen={setIsGardenModalOpen} />}

      <div className={styles.welcome}>
        <h1>
          Welcome,
        </h1>
        <h1 className={styles.userName}>{session.user.name}</h1>
      </div>
      <div className={styles.banner}>
        <div className={styles.imageGarden}>
          {/* landing page image */}
          <Image
            className={styles.image}
            src={currentModule.imageUrl}
            alt="landing page Image"
            width={600}
            height={300}
            style={{ borderRadius: '10px' }}
          />
          {/* going to garden */}
          <div className={styles.garden}>
            <h2>Your Garden</h2>
            <div className={styles.gardenInfo}>Started on June 2024</div>
            <div className={styles.gardenInfo}>1 Plant collected</div>
            <div className={styles.gardenInfo}>3 Hours spent in total</div>
            <div
              onClick={() => setIsGardenModalOpen(true)}
              className={styles.enterGarden}
            >
              Enter Garden
            </div>
          </div>
        </div>
      </div>
      <CourseDisplay />
    </div>
  );
}

export default LandingPage;
