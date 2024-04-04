'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './page.module.css';

function Store() {
  const [currentTab, setCurrentTab] = useState('accessories');

  const [accessories, setAccessories] = useState([
    {
      name: 'Item 1',
      price: 10,
      image: '/curiousgeorge.png',
    },
    {
      name: 'Item 2',
      price: 15,
      image: '/curiousgeorge.png',
    },
    {
      name: 'Item 3',
      price: 20,
      image: '/curiousgeorge.png',
    },
  ]);

  const [backgrounds, setBackgrounds] = useState([
    {
      name: 'Item 4',
      price: 10,
      image: '/curiousgeorge.png',
    },
    {
      name: 'Item 5',
      price: 15,
      image: '/curiousgeorge.png',
    },
    {
      name: 'Item 6',
      price: 20,
      image: '/curiousgeorge.png',
    },
  ]);

  const [userAccessories, setUserAccessories] = useState([]);
  const [userBackgrounds, setUserBackgrounds] = useState([]);

  function buyItem(item) {
    if (item.price > 100) {
      // eslint-disable-next-line no-alert
      alert('You do not have enough coins');
    } else {
      // eslint-disable-next-line no-alert
      alert('Item bought');
      setUserAccessories([...userAccessories, item]);
    }
  }

  function storeItem(item) {
    return (
      <div className={styles.storeItem}>
        <img src={item.image} alt={item.name} />
        <div className={styles.storeItemPrice}>
          <span>{item.price}</span>

        </div>
        <div className={`${styles.storeItemDetails} ${userAccessories.includes(item) ? styles.bought : ''}`}>
          <span>{item.name}</span>
          {userAccessories.includes(item) ? (
            <Button
              type="button"
              sx={{
                borderRadius: '1em',
                backgroundColor: 'gray',
                color: 'darkgray',
                textTransform: 'none',
                fontFamily: 'inherit',
              }}
            >
              Bought
            </Button>
          ) : (
            <Button
              type="button"
              sx={{
                borderRadius: '1em',
                backgroundColor: 'green',
                textTransform: 'none',
                fontFamily: 'inherit',
                color: 'white',
              }}
              onClick={() => buyItem(item)}
            >
              Buy
            </Button>
          )}
        </div>
      </div>
    );
  }

  function accesoriesTab() {
    return (
      <div className={styles.storeItems}>
        {accessories.map((item) => storeItem(item))}
      </div>
    );
  }

  function backgroundTab() {
    return (
      <div className={styles.storeItems}>
        {backgrounds.map((item) => storeItem(item))}
      </div>
    );
  }

  return (
    <div className={styles.store}>
      <h1> Store</h1>
      <div className={styles.storeTabs}>
        <Button
          type="button"
          sx={{
            borderRadius: 0,
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
            borderRadius: 0,
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
      {currentTab === 'accessories' && accesoriesTab()}
      {currentTab === 'background' && backgroundTab()}
    </div>
  );
}

export default Store;
