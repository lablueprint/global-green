import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import ModalWelcome from './ModalWelcome';
import styles from './page.module.css';

export default function GardenModal({
  setIsGardenModalOpen, flowers, backgroundOptions = ['bg1', 'bg2', 'bg3'], accessoryOptions = ['acc1', 'acc2', 'acc3', 'acc4'],
}) {
  const variant = {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: { opacity: 1, scale: 1.2, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 100 },

  };
  // Next steps:
  // - Factor out the garden visualization (from here + modal welcome, near identical)
  // add accessory and background images to local storage + make model to connect with string rep
  // initialize states w user values and update

  // initialize states by inputting user data

  // Official state of user garden
  // mb replace this w a function to update the user state??
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [currentTab, setCurrentTab] = useState('accessories'); // accessories, background
  const [gardenState, setGardenState] = useState({
    background: '',
    accessories: [],
  });

  useEffect(() => {
    console.log(gardenState);
  }, [gardenState]);

  // State to track items selected in menu
  const [selector, setSelector] = useState({
    background: '',
    accessories: [],
  });

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

  function applySelections() {
    setGardenState(() => ({
      background: selector.background,
      accessories: selector.accessories,
    }));
  }

  // object to associate appropriate functions with tab category
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
            className={styles.gardenModalEditItem}
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
                      className={`${styles.gardenEditImage} ${styles.gardenEarth}`}
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
  flowers: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  accessoryOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
