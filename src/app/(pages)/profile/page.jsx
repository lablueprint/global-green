'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg'; // Assuming you have a default profile pic


/*
const userData = {
  userName: 'Isaac Wen',
  rank: '1000',
  badges: ['Badge 1', 'Badge 2', 'Badge 3', 'Badge 4', 'Badge 5'],
  courses: ['Course 1', 'Course 2', 'Course 3'],
};
*/

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);

  const [userData, setUserData] = useState({});
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    if (!userData.userName) {
     async function fetchUserData() {
        if (localStorage.getItem('userData')) {
          const data = JSON.parse(localStorage.getItem('userData'));
          setUserData(data);
          setEditedName(data.userName);
          return;
        }
        else {
        const response = await fetch('/api/users');
        const all_users = await response.json();
        const data = all_users['users'][0];
        setUserData(data);
        setEditedName(data.userName);
        localStorage.setItem('userData', JSON.stringify(data));
        console.log('data', data);
        }
      }
      fetchUserData();
    }
  }
  , [userData]);

  const updateUserData = (data) => {
    // update the user data in the database, make sure only the first user is updated.
    async function updateUserDataInDB() {
      console.log('data', data);
      
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      const all_users = await response.json();
      console.log(all_users);
    }
    updateUserDataInDB();


    // update the user data in the local storage
    localStorage.setItem('userData', JSON.stringify(data));

  };


  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    userData.userName = editedName;
    localStorage.setItem('userData', JSON.stringify(userData));
    updateUserData(userData);
  };

  const handleChangeProfileImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <div className={styles.profile}>Profile</div>
      <div
        style={{
          width: '120px', height: '120px', borderRadius: '50%', display: 'inline-block', position: 'relative',
        }}
        onClick={() => document.getElementById('profileImageInput').click()}
      >
        <Image
          src={profileImage}
          alt="Profile"
          width={120}
          height={120}
          style={{ borderRadius: '50%' }}
        />
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChangeProfileImage}
        />
      </div>
      <div className={styles.name}>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleBlur}
            autoFocus
            className={styles.editableInput}
          />
        ) : (
          <h1 onClick={handleNameClick}>{userData.userName}</h1>
        )}
        <p>
          Rank:
          {userData.rank}
        </p>
      </div>
      <div className={styles.badgesSection}>
        <h2>Badges</h2>
        <div className={styles.row}>
          {userData.badges ? userData.badges.map((badge, index) => (
            <div key={index} className={styles.badgeItem}>
              <div className={styles.badgeIcon} />
              <div className={styles.rowName}>{badge}</div>
            </div>
          ))
            : null}
        </div>
      </div>
      <div className={styles.coursesSection}>
        <h2>Courses</h2>
        <div className={styles.row}>
          {userData.courses ? userData.courses.map((course, index) => (
            <div key={index} className={styles.courseItem}>
              <div className={styles.courseIcon} />
              <div className={styles.rowName}>{course}</div>
            </div>
          ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
