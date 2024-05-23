import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import ModalWelcome from './ModalWelcome';
import styles from './page.module.css';
import GardenImage from './GardenImage';

export default function GardenModal({
  setIsGardenModalOpen, flowers, accessories, backgrounds, gardenState, setGardenState,
}) {
  // Official state of user garden
  // mb replace this w a function to update the user state??
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [currentTab, setCurrentTab] = useState('accessories'); // accessories, background

  // TODO: need to add restrictions from adding items that haven't been bought yet
  // check user backgrounds and accessories (maybe new api route or from user object)
  // and compare with the options arrays below to either add a gray overlay or not

  // TODO: come up with a better method of storing these constants

  // State to track items selected in menu
  const [selector, setSelector] = useState(null);
  useEffect(() => {
    setSelector(gardenState);
  }, []);

  function selectBackground(val) {
    setSelector((prevSelector) => ({
      ...prevSelector,
      background: val,
    }));
  }

  function backgroundIsSelected(val) {
    return selector.background === val;
  }

  function selectAccessories(val) {
    setSelector((prevSelector) => ({
      ...prevSelector,
      accessories: prevSelector.accessories.includes(val)
        ? prevSelector.accessories.filter((i) => i !== val) : [...prevSelector.accessories, val],
    }));
  }

  function accessoryIsSelected(val) {
    return selector.accessories.includes(val);
  }

  async function applySelections() {
    setGardenState(() => ({
      background: selector.background,
      accessories: selector.accessories,
    }));
    setIsCustomizing(false);
  }

  // object to associate appropriate functions with tab category
  const backgroundOptions = backgrounds || [];
  const accessoryOptions = accessories || [];

  const tabObject = {
    background: [backgroundOptions, backgroundIsSelected, selectBackground],
    accessories: [accessoryOptions, accessoryIsSelected, selectAccessories],
  };

  function selectorTab() {
    // first deconstruct appropriate functions
    const [options, isSelected, select] = tabObject[currentTab];

    return (
      <div className={styles.gardenModalEditTab}>
        {options.map((item) => (
          <motion.div
            key={item}
            className={`${styles.gardenModalEditItem} ${styles[`${currentTab}${item}`]}`}
            style={{
              border: isSelected(item) ? '4px solid green' : 'none',
              cursor: 'pointer',
            }}
            onPointerDown={() => { select(item); }}
          >
            {isSelected(item) && currentTab === 'accessories' // background can't be fully removed
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

  return (
    <div
      className={styles.gardenModalOverlay}
    >
      {
        isCustomizing
          ? (
            <div className={styles.gardenModal}>
              <h2 className={styles.gardenModalText}>Edit</h2>
              <div className={styles.gardenModalEditBox}>
                <div className={styles.gardenModalEditBoxLeft}>
                  <GardenImage status="edit" flowers={flowers} />
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
                  </div>
                  {selectorTab()}
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
                      onClick={() => applySelections()}
                      disabled={currentTab !== 'background' && selector.accessories.length === 0} // don't think background would ever be disabled?
                    >
                      { selector.accessories.length > 0 || currentTab === 'background'
                        ? 'Add to Garden'
                        : 'Nothing Selected'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <ModalWelcome
              setIsGardenModalOpen={setIsGardenModalOpen}
              flowers={flowers}
              setIsCustomizing={setIsCustomizing}
            />
          )
        }
    </div>
  );
}

GardenModal.propTypes = {
  setIsGardenModalOpen: PropTypes.func.isRequired,
  flowers: PropTypes.objectOf(PropTypes.bool).isRequired,
  accessories: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgrounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  gardenState: PropTypes.shape({
    background: PropTypes.string,
    accessories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setGardenState: PropTypes.func.isRequired,
};
