'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

function Store() {
  const { data: session } = useSession();
  const [seeds, setSeeds] = useState(0);
  const [userId, setUserId] = useState(session ? session.user.id : null);
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
  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch(
      '/api/users/me',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );

    const data = await response.json();
    console.log('data', data);
    setUserAccessories(data.user.accessories ? data.user.accessories : []);
    setUserBackgrounds(data.user.backgrounds ? data.user.backgrounds : []);
    setSeeds(data.user.seeds ? data.user.seeds : 50);
    setUserId(data.user._id);
  };

  async function updateUserDataInDB(newUserAccessories, newUserBackgrounds, newSeeds) {
    const response = await fetch('/api/users/me/buy-item', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userAccessories: newUserAccessories,
        userBackgrounds: newUserBackgrounds,
        seeds: newSeeds,
      }),
    });
    const res = await response.json();
    console.log('res', res);

    if (res.error) {
      // eslint-disable-next-line no-alert
      alert(res.error);
      throw new Error(res.error);
    }

    // eslint-disable-next-line no-console
    console.log('Update success', response.data);
  }

  useEffect(() => {
    if (session) getUserDetails(session.user.id);
  }, [session]);
  function buyItem(item, type) {
    if (item.price > seeds) {
      // eslint-disable-next-line no-alert
      alert('You do not have enough coins. no room for broke kidz');
    } else {
      if (type === 'accessories') {
        setUserAccessories([...userAccessories, item.name]);
      }
      if (type === 'background') {
        setUserBackgrounds([...userBackgrounds, item.name]);
      }
      setSeeds(seeds - item.price);
      updateUserDataInDB(
        type === 'accessories' ? [...userAccessories, item.name] : userAccessories,
        type === 'background' ? [...userBackgrounds, item.name] : userBackgrounds,
        seeds - item.price,
      );
    }
  }

  function storeItem(item) {
    return (
      <div
        className={styles.storeItem}
        key={item.name}
      >
        <img src={item.image} alt={item.name} />
        <div className={styles.storeItemPrice}>
          <span>{item.price}</span>

        </div>
        <div className={`${styles.storeItemDetails} ${userAccessories.includes(item.name) || userBackgrounds.includes(item.name) ? styles.bought : ''}`}>
          <span>{item.name}</span>
          {userAccessories.includes(item.name) || userBackgrounds.includes(item.name) ? (
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
              onClick={() => buyItem(item, currentTab)}
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
      <h2>
        Seeds:
        {seeds}
      </h2>
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
