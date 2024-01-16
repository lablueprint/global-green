'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from '@/app/components/navbar';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg'; // Assuming you have a default profile pic

const userData = {
  name: 'Isaac Wen',
  rank: '1000',
  badges: ['Badge 1', 'Badge 2', 'Badge 3', 'Badge 4', 'Badge 5'],
  courses: ['Course 1', 'Course 2', 'Course 3'],
};

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    userData.name = editedName;
  };

  const handleChangeProfileImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <NavBar />
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
          <h1 onClick={handleNameClick}>{userData.name}</h1>
        )}
        <p>
          Rank:
          {userData.rank}
        </p>
      </div>
      <div className={styles.badgesSection}>
        <h2>Badges</h2>
        <div className={styles.row}>
          {userData.badges.map((badge, index) => (
            <div key={index} className={styles.badgeItem}>
              <div className={styles.badgeIcon} />
              <div className={styles.rowName}>{badge}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.coursesSection}>
        <h2>Courses</h2>
        <div className={styles.row}>
          {userData.courses.map((course, index) => (
            <div key={index} className={styles.courseItem}>
              <div className={styles.courseIcon} />
              <div className={styles.rowName}>{course}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
