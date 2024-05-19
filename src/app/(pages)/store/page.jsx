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

  const [accessories, setAccessories] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  
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

  const getAllAccessories = async () => {
    const response = await fetch('/api/data/accessories');
    const data = await response.json();
    setAccessories(data);
  };

  const getAllBackgrounds = async () => {
    const response = await fetch('/api/data/backgrounds');
    const data = await response.json();
    setBackgrounds(data);
  };

  useEffect(() => {
    getAllAccessories();
    getAllBackgrounds();
  }, []);

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
      alert(res.error);
      throw new Error(res.error);
    }

    console.log('Update success', response.data);
  }

  useEffect(() => {
    if (session) getUserDetails(session.user.id);
  }, [session]);

  function buyItem(item, type) {
    if (item.price > seeds) {
      alert('You do not have enough coins.');
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

        <div className={styles.storeItemImg}>
          {
            (userAccessories.includes(item.name) || userBackgrounds.includes(item.name))
            && <div className={styles.storeItemImgOverlay} />
          }
          <img src={item.image} alt={item.name} />
        </div>
        <div className={styles.storeItemPrice}>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {item.price}
            <img
              src="/store/seeds_logo.svg"
              alt="icon"
              width="10px"
              height="10px"
              style={{ marginLeft: '4px' }}
            />
          </span>
        </div>
        <div className={`${styles.storeItemDetails}`}>
          <span>{item.name}</span>
          {userAccessories.includes(item.name) || userBackgrounds.includes(item.name) ? (
            <Button
              type="button"
              sx={{
                borderRadius: '1em',
                padding: '0.2em 1.2em',
                backgroundColor: 'lightgray',
                color: 'gray',
                textTransform: 'none',
                fontFamily: 'inherit',
              }}
              disabled
            >
              Bought
            </Button>
          ) : (
            <Button
              type="button"
              sx={{
                borderRadius: '1em',
                padding: '0.45em 2em',
                backgroundColor: '#519546',
                fontFamily: 'inherit',
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Instrument Sans',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '110%',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#519546', 
                  color: 'white',
                  opacity: 0.9,
                },
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
        {accessories.map((item, index) => (
          <React.Fragment key={item.name}>
            <div style={{ margin: '0 50px 10px 10px' }}>
              {storeItem(item)}
            </div>
          </React.Fragment>
        ))}
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
      <div className={styles.title}> 
        Store
        <div className={styles.seedsTitle}>
          {seeds}
          <img
            src="/store/seeds_logo_title.svg"
          />
        </div>
      </div>
      <div className={styles.storeTabs}>
        <Button
          type="button"
          sx={{
            borderRadius: 0,
            backgroundColor: 'transparent',
            textTransform: 'none',
            fontFamily: 'Instrument Sans',
            color: currentTab === 'accessories' ? '#519546' : '#9B9B9B',
            borderBottom: currentTab === 'accessories' ? '2px solid #519546' : 'none',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '110%',      
            marginRight: '15px',
            '&:hover': {
              backgroundColor: 'transparent', 
              color: currentTab === 'accessories' ? '#519546' : '#9B9B9B', 
              borderBottom: currentTab === 'accessories' ? '2px solid #519546' : 'none', 
            },
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
            textTransform: 'none',
            fontFamily: 'Instrument Sans',
            color: currentTab === 'background' ? '#519546' : '#9B9B9B',
            borderBottom: currentTab === 'background' ? '2px solid #519546' : '1px solid lightgrey',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '110%',   
            '&:hover': {
              backgroundColor: 'transparent',
              color: currentTab === 'background' ? '#519546' : '#9B9B9B',
              borderBottom: currentTab === 'background' ? '2px solid #519546' : '1px solid lightgrey', 
            },
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
