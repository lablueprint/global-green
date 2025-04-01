'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import CourseDisplay from './CourseDisplay';
import GardenModal from './GardenModal';
import GardenImage from './GardenImage';
import ChallengeBadge from '@/app/components/snackBar';
import WelcomeUser from './WelcomeUser';

function LandingPage() {
  // const [gardenBadge, setGardenBadge] = useState(false);
  // const [user, setUser] = useState({});
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState(null);
  // const [currentModule] = useState({
  //   imageUrl: '/landingpageImage.png',
  //   name: 'Chinenye Eneh',
  // });
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idWaitTimer, setIdWaitTimer] = useState(null); // keep track of time waiting for ID

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

  const getCoursesInfo = useCallback(
    async (id) => {
      if (!id) {
        console.log('no id provided, skipping fetch');
        return false;
      }

      try {
        console.log('fetch user info with ID:', id);
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
        console.log('user data fetched successfully!');

        // set the flowers based on progress
        if (user?.courses) {
          const adjustFlowers = { ...flowers };
          user.courses.forEach((course) => {
            if (course.complete) {
              adjustFlowers[courseFlowerMap[course.key]] = true;
            }
          });
          console.log('user', user);
          console.log('adjustFlowers', adjustFlowers);
          setFlowers(adjustFlowers);
        }

        if (user?.accessories) setAccessories(user.accessories);
        if (user?.backgrounds) setBackgrounds(user.backgrounds);
        // set the garden based on the user selection
        // TODO: add more checks for if a user field exists! some accounts don't have some fields
        if (user?.garden?.background) {
          setGardenState(user.garden);
          console.log(user.garden);
        }

        if (user.userName) {
          console.log('setting username from API:', user.userName);
          setUserName(user.userName);
        } else if (session?.user?.userName) {
          console.log('setting username from session:', session.user.userName);
          setUserName(session.user.userName);
        }

        setDataFetched(true);
        setIsLoading(false);

        if (idWaitTimer) {
          clearTimeout(idWaitTimer);
          setIdWaitTimer(null);
        }

        return true;
      } catch (error) {
        console.log('error fetching user data:', error);
        setIsLoading(false);
        return false;
      }
    },
    [flowers, courseFlowerMap, session, idWaitTimer] // [session]
  );

  // basic try to fetch data from session
  const setNameFromSession = useCallback(() => {
    if (session?.user?.userName) {
      setUserName(session.user.userName);
    }
  }, [session]);

  // useEffect(() => {
  //   console.log('STHSTHSTH: ', session, status);
  //   if (status === 'authenticated' && session?.user?.id) {
  //     getCoursesInfo(session.user.id);
  //   }
  // }, [status, session]);

  // session monitoring and data fetching
  useEffect(() => {
    if (dataFetched) return;

    if (status !== 'authenticated') {
      console.log('session not authenticated yet');
      return;
    }

    console.log('session authenticated, checking for ID');
    setNameFromSession();
    if (session?.user?.id) {
      console.log('ID found immediately, fetching data');
      getCoursesInfo(session.user.id);
      return;
    }

    console.log('no ID yet, setting up wait timer');
    if (idWaitTimer) {
      clearTimeout(idWaitTimer);
    }

    // polling mechanism to check ID every 500ms
    const intervalId = setInterval(() => {
      console.log('checking for ID...');
      if (session?.user?.id) {
        console.log('ID FOUND DURING POLLING');
        clearInterval(intervalId);
        getCoursesInfo(session.user.id);
      }
    }, 500);

    // setting a 5-second timeout to stop polling if no ID
    const timeoutId = setTimeout(() => {
      console.log('timed out waiting for id');
      clearInterval(intervalId);
      setIsLoading(false);
      setDataFetched(true);
    }, 5000);

    setIdWaitTimer(timeoutId);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [
    status,
    session,
    getCoursesInfo,
    dataFetched,
    idWaitTimer,
    setNameFromSession,
  ]);
  // is this triggered if all changes or just one?

  const updateGardenState = async (id) => {
    if (!id) return;

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
      <WelcomeUser userName={userName} />
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
