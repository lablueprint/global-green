import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function ModalWelcome({
  setIsGardenModalOpen, flowers, setIsCustomizing,
}) {
  const variant = {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: { opacity: 1, scale: 1.2, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 100 },

  };

  return (
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
          className={`${styles.gardenImage} ${styles.gardenEarthWide}`}
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
          onClick={() => setIsGardenModalOpen(false)}
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
  );
}

ModalWelcome.propTypes = {
  setIsGardenModalOpen: PropTypes.func.isRequired,
  flowers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setIsCustomizing: PropTypes.func.isRequired,
};
