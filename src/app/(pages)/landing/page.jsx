'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import CourseDisplay from './CourseDisplay';
import GardenModal from './GardenModal';
import GardenImage from './GardenImage';
import ChallengeBadge from '@/app/components/snackBar';

function LandingPage() {
  // const [gardenBadge, setGardenBadge] = useState(false);
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  // const [currentModule] = useState({
  //   imageUrl: '/landingpageImage.png',
  //   name: 'Chinenye Eneh',
  // });
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);

  // TODO: replace this mapping method
  // better naming scheme - either as global variables since local to track which indexes
  // move garden state to redux to make the operations easier
  const courseFlowerMap = {
    plasticandrecycling: 1,
    sustainabilitylab: 2,
    conservationandrestoration: 3,
    climatechange: 4,
    oceanpollution: 5,
    'eco-friendlytravel': 6,
  };
  const [flowers, setFlowers] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  // TODO: potentially move this and the update functions to a redux state
  const [gardenState, setGardenState] = useState({
    background: 'background1',
    accessories: [],
  });
  const [accessories, setAccessories] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

  const getCoursesInfo = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { user } = data;

    // set the flowers based on progress
    const adjustFlowers = flowers;
    user.courses.forEach((course) => {
      if (course.complete) {
        adjustFlowers[courseFlowerMap[course.key]] = true;
      }
    });
    console.log('user', user);
    console.log('adjustFlowers', adjustFlowers);
    setFlowers(adjustFlowers);

    setAccessories(user.accessories);
    setBackgrounds(user.backgrounds);

    // set the garden based on the user selection
    // TODO: add more checks for if a user field exists! some accounts don't have some fields
    if (user.garden && user.garden.background) {
      setGardenState(user.garden);
      console.log(user.garden);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCoursesInfo(session.user.id);
  }, [session]);

  const updateGardenState = async (id) => {
    // update the user's garden state
    await fetch('/api/users/me/update-garden', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, garden: gardenState }),
    });
  };
  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, garden: gardenState }),
    });
  };

  useEffect(() => {
    if (
      !(
        gardenState.background === 'background1' &&
        gardenState.accessories.length === 0
      )
    ) {
      updateGardenState(session.user.id);
    }
  }, [gardenState]);

  // seeing landing page banner
  return (
    <div className={styles.landingPage}>
      {isGardenModalOpen && (
        <GardenModal
          setIsGardenModalOpen={setIsGardenModalOpen}
          flowers={flowers}
          accessories={accessories}
          backgrounds={backgrounds}
          gardenState={gardenState}
          setGardenState={setGardenState}
        />
      )}
      <div className={styles.welcome}>
        <h1>
          Welcome,{' '}
          <span className={styles.userName}>
            {loading
              ? 'User'
              : session?.user?.userName && session.user.userName}
          </span>
        </h1>
      </div>
      <div className={styles.banner}>
        <div className={styles.imageGarden}>
          <GardenImage
            status="view"
            flowers={flowers}
            gardenState={gardenState}
          />
          {/* going to garden */}
          {/* TODO: Figure out how to get garden info? */}
          <div className={styles.garden}>
            <div className={styles.gardenText}>
              <h2>Your Garden</h2>
              <div className={styles.gardenInfoContainer}>
                <div className={styles.gardenInfo}>Started on June 2024</div>
                <div className={styles.gardenInfo}>1 Plant collected</div>
                <div className={styles.gardenInfo}>3 Hours spent in total</div>
              </div>
            </div>
            <div className={styles.gardenButton}>
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
    </div>
  );
}
export default LandingPage;
