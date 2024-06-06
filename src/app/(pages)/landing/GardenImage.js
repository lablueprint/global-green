import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function GardenImage({ status, flowers, gardenState }) {
  const variant = {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: { opacity: 1, scale: 1.2, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 100 },
  };
  const isView = status === 'view';

  const containerClass = isView
    ? styles.gardenModalImageContainer : styles.gardenEditImageContainer;
  const backgroundClass = isView
    ? `${styles.gardenImage} ${styles.gardenBackgroundWide}`
    : `${styles.gardenEditImage} ${styles.gardenBackground}`;
  const earthClass = isView
    ? `${styles.gardenImage} ${styles.gardenEarthWide}`
    : `${styles.gardenEditImage} ${styles.gardenEarth}`;
  const flowerClass = (index) => (isView
    ? `${styles.gardenImage} ${styles[`gardenFlower${index}Wide`]}`
    : `${styles.gardenEditImage} ${styles[`gardenFlower${index}`]}`);

  const accessoryClass = (accessory) => (isView
    ? `${styles.gardenImage} ${styles[`gardenAcc${accessory}Wide`]}`
    : `${styles.gardenEditImage} ${styles[`gardenAcc${accessory}`]}`);

  return (
    <div className={containerClass}>
      <div className={backgroundClass}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 70, repeat: Infinity }}
          className={earthClass}
        />

        <div>
          <AnimatePresence>
            {Object.keys(flowers).map((index) => (flowers[index] ? (
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
                className={flowerClass(index)}
              />
            ) : null))}
            {gardenState.accessories.map((accessory) => (
              <motion.div
                key={accessory}
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
                className={accessoryClass(accessory)}
              />
            ))}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

GardenImage.propTypes = {
  status: PropTypes.string.isRequired,
  flowers: PropTypes.objectOf(PropTypes.bool).isRequired,
  gardenState: PropTypes.shape({
    background: PropTypes.string,
    accessories: PropTypes.arrayOf(PropTypes.string),
  }),
};
