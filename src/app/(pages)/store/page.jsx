'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import ChallengeBadge from '@/app/components/snackBar';
import Popup from './PopupMessage.jsx';

function Store() {
  const { data: session } = useSession();
  const [seeds, setSeeds] = useState(0);
  const [userId, setUserId] = useState(session ? session.user.id : null);
  const [currentTab, setCurrentTab] = useState('accessories');

  const [accessories, setAccessories] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

  const [userAccessories, setUserAccessories] = useState([]);
  const [userBackgrounds, setUserBackgrounds] = useState([]);

  const [buyThreeAccessoriesBadge, setBuyThreeAccessoriesBadge] =
    useState(false);
  const [buySixAccessoriesBadge, setBuySixAccessoriesBadge] = useState(false);
  const [buyThreeBackgroundsBadge, setBuyThreeBackgroundsBadge] =
    useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupItemName, setPopupItemName] = useState('');
  const [popupItemImage, setPopupItemImage] = useState('');

  useEffect(() => {
    function handleClickOutside(event) {
      const popupElement = document.getElementById('popup');
      if (showPopup && popupElement && !popupElement.contains(event.target)) {
        setShowPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

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

  async function updateUserDataInDB(
    newUserAccessories,
    newUserBackgrounds,
    newSeeds
  ) {
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

  function showPopupMessage(message, itemName, itemImage) {
    setPopupMessage(message);
    setPopupItemName(itemName);
    setPopupItemImage(itemImage);
    setShowPopup(true);
  }

  function buyItem(item, type) {
    if (item.price > seeds) {
      alert('You do not have enough coins.');
    } else {
      if (type === 'accessories') {
        if (userAccessories.length === 2) {
          const response = fetch('/api/users/me/add-badge', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              badge: 'buyThreeAccessories',
              seeds: 20,
            }),
          });
          setBuyThreeAccessoriesBadge(true);
        } else if (userAccessories.length === 5) {
          const response = fetch('/api/users/me/add-badge', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              badge: 'buySixAccessories',
              seeds: 30,
            }),
          });
          setBuySixAccessoriesBadge(true);
        }

        setUserAccessories([...userAccessories, item.name]);
      }
      if (type === 'background') {
        if (userBackgrounds.length === 2) {
          const response = fetch('/api/users/me/add-badge', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              badge: 'buyThreeBackgrounds',
              seeds: 20,
            }),
          });
          setBuyThreeBackgroundsBadge(true);
        }

        setUserBackgrounds([...userBackgrounds, item.name]);
      }
      setSeeds(seeds - item.price);

      updateUserDataInDB(
        type === 'accessories'
          ? [...userAccessories, item.name]
          : userAccessories,
        type === 'background'
          ? [...userBackgrounds, item.name]
          : userBackgrounds,
        seeds - item.price
      );
      showPopupMessage('Congrats! You just bought', item.name, item.image);
    }
  }

  function storeItem(item) {
    return (
      <div className={styles.storeItem} key={item.name}>
        <ChallengeBadge
          challengeName="Buy three accessories"
          challengePointValue="20"
          open={buyThreeAccessoriesBadge}
          handleClose={() => setBuyThreeAccessoriesBadge(false)}
        />
        <ChallengeBadge
          challengeName="Buy six accessories"
          challengePointValue="20"
          open={buySixAccessoriesBadge}
          handleClose={() => setBuySixAccessoriesBadge(false)}
        />

        <ChallengeBadge
          challengeName="Buy three backgrounds"
          challengePointValue="20"
          open={buyThreeBackgroundsBadge}
          handleClose={() => setBuyThreeBackgroundsBadge(false)}
        />

        <div className={styles.storeItemImg}>
          {(userAccessories.includes(item.name) ||
            userBackgrounds.includes(item.name)) && (
            <div className={styles.storeItemImgOverlay} />
          )}
          <img src={item.image} alt={item.name} />

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
        </div>
        <div className={`${styles.storeItemDetails}`}>
          <span>{item.name}</span>
          {userAccessories.includes(item.name) ||
          userBackgrounds.includes(item.name) ? (
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
    <div className={styles.storeContainer}>
      <div className={styles.store}>
        <div className={styles.title}>
          Store
          <div className={styles.seedsTitle}>
            {seeds}
            <img src="/store/seeds_logo_title.svg" />
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
              borderBottom:
                currentTab === 'accessories' ? '2px solid #519546' : 'none',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '110%',
              '&:hover': {
                backgroundColor: 'transparent',
                color: currentTab === 'accessories' ? '#519546' : '#9B9B9B',
                borderBottom:
                  currentTab === 'accessories' ? '2px solid #519546' : 'none',
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
              borderBottom:
                currentTab === 'background'
                  ? '2px solid #519546'
                  : '1px solid lightgrey',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '110%',
              '&:hover': {
                backgroundColor: 'transparent',
                color: currentTab === 'background' ? '#519546' : '#9B9B9B',
                borderBottom:
                  currentTab === 'background'
                    ? '2px solid #519546'
                    : '1px solid lightgrey',
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
      {showPopup && (
        <Popup
          message="Congrats! You just bought"
          itemName={popupItemName}
          itemImage={popupItemImage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default Store;
