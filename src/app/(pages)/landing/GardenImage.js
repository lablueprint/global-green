import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function GardenImage({ status, flowers }) {
  const variant = {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: { opacity: 1, scale: 1.2, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 100 },
  };
  const isView = status === 'view';

  const containerClass = styles.gardenModalImageContainer;
  const backgroundClass = isView
    ? `${styles.gardenImage} ${styles.gardenBackgroundWide}`
    : `${styles.gardenEditImage} ${styles.gardenBackground}`;
  const earthClass = isView
    ? `${styles.gardenImage} ${styles.gardenEarthWide}`
    : `${styles.gardenEditImage} ${styles.gardenEarth}`;
  const flowerClass = (index) => (isView
    ? `${styles.gardenImage} ${styles[`gardenFlower${index}Wide`]}`
    : `${styles.gardenEditImage} ${styles[`gardenFlower${index}`]}`);

  return (
    <div className={containerClass}>
      <div className={backgroundClass} />
      <motion.div
        animate={{ rotate: 360, opacity: 1 }}
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
              layout
              layoutId={`gardenFlower${index}`}
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
        </AnimatePresence>
      </div>
    </div>
  );
}

GardenImage.propTypes = {
  status: PropTypes.string.isRequired,
  flowers: PropTypes.objectOf(PropTypes.bool).isRequired,
};
