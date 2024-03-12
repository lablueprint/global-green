'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // import from Material UI Library
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './page.module.css';

function GardenModal() {
  const variant = {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: { opacity: 1, scale: 1.2, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 100 },

  };

  const [flowers, setFlowers] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const [background, setBackground] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [accessories, setAccessories] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [selectedItems, setSelectedItems] = useState({
    flowers: [],
    background: [],
    accessories: [],
  });

  function toggleFlower(index) {
    setFlowers((prevFlowers) => ({
      ...prevFlowers,
      [index]: !prevFlowers[index],
    }));
  }

  function toggleBackground(index) {
    setBackground((prevBackground) => ({
      ...prevBackground,
      [index]: !prevBackground[index],
    }));
  }

  function toggleAccessories(index) {
    setAccessories((prevAccessories) => ({
      ...prevAccessories,
      [index]: !prevAccessories[index],
    }));
  }

  function addSelectedItems(type, index) {
    // if it's already selected, remove it
    if (selectedItems[type].includes(index)) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [type]: prevSelectedItems[type].filter((item) => item !== index),
      }));
    } else {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [type]: [...prevSelectedItems[type], index],
      }));
    }
  }

  function addToGarden() {
    // add selected items to garden
    selectedItems.flowers.forEach((index) => {
      toggleFlower(index);
    });
    selectedItems.background.forEach((index) => {
      toggleBackground(index);
    });
    selectedItems.accessories.forEach((index) => {
      toggleAccessories(index);
    });
    setSelectedItems({
      flowers: [],
      background: [],
      accessories: [],
    });
  }

  function accesoriesTab() {
    return (
      <div className={styles.gardenModalEditTab}>
        {Object.keys(accessories).map((index) => (
          <motion.div
            key={index}
            className={styles.gardenModalEditItem}
            style={{
              border: selectedItems.accessories.includes(index) ? '4px solid green' : 'none',
              cursor: 'pointer',
            }}
            onPointerDown={() => {
              if (accessories[index]) {
                toggleAccessories(index);
              } else {
                addSelectedItems('accessories', index);
              }
            }}
          >
            {accessories[index]
            && (
            <div
              className={styles.gardenModalEditItemRemove}
            >
              Remove
            </div>
            )}

          </motion.div>
        ))}
      </div>
    );
  }

  function backgroundTab() {
    return (
      <div className={styles.gardenModalEditTab}>
        {Object.keys(background).map((index) => (
          <motion.div
            key={index}
            className={styles.gardenModalEditItem}
            style={{
              border: selectedItems.background.includes(index) ? '4px solid green' : 'none',
              cursor: 'pointer',
            }}
            onPointerDown={() => {
              if (background[index]) {
                toggleBackground(index);
              } else {
                addSelectedItems('background', index);
              }
            }}
          >
            {background[index]
            && (
              <div
                className={styles.gardenModalEditItemRemove}
              >
                Remove
              </div>
            )}

          </motion.div>
        ))}
      </div>
    );
  }

  function flowersTab() {
    return (
      <div className={styles.gardenModalEditTab}>
        {Object.keys(flowers).map((index) => (
          <motion.div
            key={index}
            className={`${styles.gardenModalEditItem} ` + `${styles[`gardenFlower${index}`]}
            `}

            style={{
              border: selectedItems.flowers.includes(index) ? '4px solid green' : 'none',
              cursor: 'pointer',
            }}
            onPointerDown={() => {
              if (flowers[index]) {
                toggleFlower(index);
              } else {
                addSelectedItems('flowers', index);
              }
            }}
          >
            {flowers[index]
            && (
            <div
              className={styles.gardenModalEditItemRemove}
            >
              Remove
            </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [currentTab, setCurrentTab] = useState('accessories'); // accessories, background, flowers
  return (
    <div className={styles.gardenModalOverlay}>
      {
      isCustomizing
        ? (
          <div className={styles.gardenModal}>
            <h2 className={styles.gardenModalText}>Edit</h2>
            <div className={styles.gardenModalEditBox}>
              <div className={styles.gardenModalEditBoxLeft}>

                <div className={styles.gardenModalImageContainer}>
                  <motion.div
                    layout
                    layoutId="gardenBackground"
                    className={`${styles.gardenEditImage} ${styles.gardenBackground}`}
                  />
                  <motion.div
                    animate={{
                      rotate: 360,
                      opacity: 1,
                    }}

                    transition={{ ease: 'linear', duration: 70, repeat: Infinity }}
                    className={`${styles.gardenEditImage}
          ${styles.gardenEarth}`}
                  />
                  <AnimatePresence>
                    {
            Object.keys(flowers).map((index) => (
              flowers[index] && (
                <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                  layoutId={`gardenFlower${index}`}
                  variants={variant}
                  transition={{
                    duration: 1,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  className={`
                  ${styles.gardenEditImage} 
                  ${styles[`gardenFlower${index}`]}
                  `}
                />
              )
            ))

          }
                  </AnimatePresence>

                </div>

              </div>
              <div className={styles.gardenModalEditBoxRight}>
                <p className={styles.gardenModalText}>
                  Customize your garden below.
                </p>
                <p className={styles.gardenModalSubtext}>
                  Your garden is where you can see the progress of your learning journey.
                </p>
                <div className={styles.gardenModalTabs}>
                  <Button
                    type="button"
                    sx={{
                      backgroundColor: 'transparent',
                      textTransform: 'none',
                      fontFamily: 'inherit',
                      color: currentTab === 'accessories' ? 'green' : 'gray',
                      borderBottom: currentTab === 'accessories' ? '2px solid green' : 'none',
                    }}
                    onClick={() => setCurrentTab('accessories')}
                  >
                    Accessories
                  </Button>
                  <Button
                    type="button"
                    sx={{
                      backgroundColor: 'transparent',
                      fontFamily: 'inherit',
                      textTransform: 'none',
                      color: currentTab === 'background' ? 'green' : 'gray',
                      borderBottom: currentTab === 'background' ? '2px solid green' : 'none',
                    }}

                    onClick={() => setCurrentTab('background')}
                  >
                    Background
                  </Button>
                  <Button
                    type="button"
                    sx={{
                      backgroundColor: 'transparent',
                      fontFamily: 'inherit',
                      textTransform: 'none',
                      color: currentTab === 'flowers' ? 'green' : 'gray',
                      borderBottom: currentTab === 'flowers' ? '2px solid green' : 'none',
                    }}
                    onClick={() => setCurrentTab('flowers')}
                  >
                    Flowers
                  </Button>
                </div>
                {currentTab === 'accessories' && accesoriesTab()}
                {currentTab === 'background' && backgroundTab()}
                {currentTab === 'flowers' && flowersTab()}

                <div className={styles.gardenModalButtonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: 'gray',
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontFamily: 'inherit',
                    }}
                    onClick={() => setIsCustomizing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: 'green',
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontFamily: 'inherit',
                    }}
                    onClick={() => addToGarden()}
                    disabled={selectedItems.accessories.length === 0
                      && selectedItems.background.length === 0
                      && selectedItems.flowers.length === 0}
                  >
                    { selectedItems.accessories.length > 0
                    || selectedItems.background.length > 0
                     || selectedItems.flowers.length > 0
                      ? 'Add to Garden'
                      : 'Nothing Selected'}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        )
        : (
          <div className={styles.gardenModal}>
            <h2 className={styles.gardenModalText}>Your Garden</h2>
            <p className={styles.gardenModalText}>
              View your garden below.
            </p>
            <p className={styles.gardenModalSubtext}>
              Your garden is where you can see the progress of your learning journey.
            </p>
            <div className={styles.gardenModalImageContainer}>
              <motion.div
                layout
                layoutId="gardenBackground"
                className={`${styles.gardenImage} ${styles.gardenBackgroundWide}`}
              />
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{ ease: 'linear', duration: 70, repeat: Infinity }}
                className={`${styles.gardenImage} 
          ${styles.gardenEarthWide}`}
              />
              <AnimatePresence>
                {
            Object.keys(flowers).map((index) => (
              flowers[index] && (
              <motion.div
                key={index}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variant}
                transition={{
                  duration: 1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                layout
                layoutId={`gardenFlower${index}`}

                className={`${styles.gardenImage} ${styles[`gardenFlower${index}Wide`]}`}
              />
              )
            ))

          }
              </AnimatePresence>

            </div>
            <div className={styles.gardenModalButtonContainer}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: 'gray',
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: 'inherit',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: 'green',
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: 'inherit',
                }}
                onClick={() => setIsCustomizing(true)}
              >
                Customize
              </Button>

            </div>
          </div>
        )

      }
    </div>
  );
}
export function WelcomeText({
  imageUrl, name, setIsGardenModalOpen,
}) {
  // garden related stuff

  return (
    <div className={styles.WelcomeText}>
      {' '}
      <h1>
        Welcome,
        {name}
      </h1>
      <div className={styles.lpbuttoncontainer}>
        <Image
          className={styles.landingpageImage}
          src={imageUrl}
          alt="landing page Image"
          width={661} // default image set up from prev course page
          height={260}
        />
        <p className={styles.enterGardenText}>Enter Garden</p>
        <Button
          variant="contained"
          color="primary"
          className={styles.lpbutton}
          onClick={() => setIsGardenModalOpen(true)}
          endIcon={<ArrowForwardIcon />}
        >
          Enter Garden
        </Button>
      </div>
    </div>
  );
}

function CourseCardPlaceholder({ courseName }) {
  return (
    <div className={styles.courseCard}>
      <h3>{courseName}</h3>
      <p>
        This is a placeholder for the
        {courseName}
        {' '}
        course.
      </p>
    </div>
  );
}

function LandingPage() {
  const courses = [
    'Plastic & Recycling',
    'Ocean Pollution',
    'Eco-friendly Traveling',
    'Ecosystem Conservation',
    'Climate Change',
  ];

  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);

  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });

  return (
    <div className={styles.landingPage}>
      {isGardenModalOpen && <GardenModal />}
      <WelcomeText
        imageUrl={currentModule.imageUrl}
        name={currentModule.name}
        setIsGardenModalOpen={setIsGardenModalOpen}
      />

      <div className={styles.courseOverview}>
        {courses.map((courseName) => (
          <CourseCardPlaceholder key={courseName} courseName={courseName} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
