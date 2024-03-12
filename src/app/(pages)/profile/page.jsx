'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { FaPencilAlt } from 'react-icons/fa';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg';
// Assuming you have a default profile pic
import PdfForm from './PdfForm';
import certData from './certData';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [editedName, setEditedName] = useState('');
  const [userData, setData] = useState({});

  const { data: session } = useSession();

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
    setData(data.user);
    setEditedName(data.user.userName);
  };

  useEffect(() => {
    console.log('session', session);
    if (session) getUserDetails(session.user.id);
  }, [session]);

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
        body: JSON.stringify({ userName: data.userName, userId: data._id }),
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

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    userData
      ? (
        <div className={styles.container}>
          <div className={styles.pageName}> My Profile </div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          {
        session ? (
          <div>
            <h2>
              Welcome,
              {session.user.userName}
            </h2>
          </div>
        ) : null

      }
      <div className={styles.container}>
          <div className={styles.pageName}> My Profile </div>
          <div
            className={styles.profileSection}
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
            <div className={styles.preferred}> Preferred Name </div>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onBlur={handleBlur}
                className={styles.editingName}
              />
            ) : (
              <div className={styles.username} onClick={handleNameClick}>{userData.userName}</div>
            )}
            </div>
          </div>
      <div className={styles.accountSection}>
        <div className={styles.sectionHeader}> Account </div>
        <div className={styles.accountRow}>
          <div className={styles.sectionText}> Avatar </div>
          <FaPencilAlt onClick={() => document.getElementById('profileImageInput').click()} />
        </div>
        <div className={styles.accountRow}>
          <div className={styles.sectionText}> Password </div>
          <FaPencilAlt />
        </div>
      </div>
      <div className={styles.certificateSection}>
        <div className={styles.sectionHeader}> Certificates </div>
        <div className={styles.row}>
          {certData.map((certificate, index) => (
            <div key={index} onClick={PdfForm.generatePdf}>
              <PdfForm
                templatePdf="/certificate.pdf"
                firstName={userData.firstName}
                lastName={userData.lastName}
                course={certificate.name}
                date={certificate.date}
                duration={certificate.duration}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.coursesSection}>
        <div className={styles.sectionHeader}>Courses</div>
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
      <div className={styles.badgesSection}>
        <div className={styles.sectionHeader}>Badges</div>
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
      </div>
      
  );
}

export default Profile;
