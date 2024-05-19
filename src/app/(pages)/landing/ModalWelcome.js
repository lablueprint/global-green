import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './page.module.css';
import GardenImage from './GardenImage';

export default function ModalWelcome({
  setIsGardenModalOpen, flowers, setIsCustomizing,
}) {
  return (
    <div className={styles.gardenModal}>
      <h2 className={styles.gardenModalText}>Your Garden</h2>
      <p className={styles.gardenModalText}>
        View your garden below.
      </p>
      <p className={styles.gardenModalSubtext}>
        Your garden is where you can see the progress of your learning journey.
      </p>
      <GardenImage status="view" flowers={flowers} />
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
  flowers: PropTypes.objectOf(PropTypes.bool).isRequired,
  setIsCustomizing: PropTypes.func.isRequired,
};
