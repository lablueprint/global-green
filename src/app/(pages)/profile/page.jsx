'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavBar from '@/app/components/navbar';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg'; // Assuming you have a default profile pic
import PdfForm from './PdfForm';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [editedName, setEditedName] = useState('');
  const [userData, setData] = useState({});

  const getUserDetails = async () => {
    const res = await fetch('/api/users/me');
    const data = await res.json();
    setData(data.user);
    setEditedName(data.user.userName);
    // eslint-disable-next-line no-console
    console.log(data.user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateUserData = (data) => {
    // update the user data in the database, make sure only the first user is updated.
    async function updateUserDataInDB() {
      // eslint-disable-next-line no-console
      console.log('data', data);

      const response = await fetch('/api/users/me/change-name', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: data.userName }),
      });
      const res = await response.json();
      // eslint-disable-next-line no-console
      console.log('res', res);

      if (res.error) {
        // eslint-disable-next-line no-alert
        alert(res.error);
        throw new Error(res.error);
      }

      // eslint-disable-next-line no-console
      console.log('Update success', response.data);
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

  const handlePdf = () => {
    console.log('hi');
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <PdfForm templatePdfUrl="https://pdf-lib.js.org/assets/with_update_sections.pdf" username={userData.userName} />
      {/* <PdfForm templatePdfUrl="https://pdf-lib.js.org/assets/dod_character.pdf" username={userData.userName} /> */}
      <NavBar />
      <div className={styles.profile}>Profile</div>
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          display: 'inline-block',
          position: 'relative',
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
          {userData.badges ? userData.badges.map((badge) => (
            <div key={badge} className={styles.badgeItem}>
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
          {userData.courses ? userData.courses.map((course) => (
            <div key={course} className={styles.courseItem}>
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
