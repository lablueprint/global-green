'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg';
// Assuming you have a default profile pic
import PdfForm from './PdfForm';
import certData from './certData';
import courseData from '../landing/courseData';
import ProgressBar from './progressBar';
import ProfilePopup from './profilePopup';
import PasswordPopup from './passwordPopup';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [editedName, setEditedName] = useState('');
  const [userData, setData] = useState({});
  const [profilePopup, setProfilePopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

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
        body: JSON.stringify({ userName: data.userName, userId: data.id }),
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

  const handleChangeProfileImage = () => {
    setProfilePopup(true);
  };

  const handleChangePassword = () => {
    setPasswordPopup(true);
  };

  const handleCloseProfile = () => {
    setProfilePopup(false);
  };

  const handleClosePassword = () => {
    setPasswordPopup(false);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const totalPages = Math.ceil(certData.length / 3);
  const startIndex = currentPage * 3;
  const displayedCertificates = certData.slice(startIndex, startIndex + 3);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    userData
      ? (
        <div className={styles.container}>
          <div className={styles.pageName}> Profile </div>

          {profilePopup && <ProfilePopup onClose={handleCloseProfile} />}
          {passwordPopup
          && (
          <PasswordPopup
            onClose={handleClosePassword}
            userPassword={userData.password}
          />
          )}

          <div className={styles.container}>
            <div className={styles.profileSection}>
              <Image
                src={profileImage}
                alt="Profile"
                width={120}
                height={120}
                style={{ borderRadius: '50%' }}
                onClick={handleChangeProfileImage}
              />
              <div className={styles.name}>
                <div className={styles.displayName}> Display Name </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    onBlur={handleBlur}
                    className={styles.editingName}
                  />
                ) : (
                  <div
                    className={styles.username}
                    onClick={handleNameClick}
                  >
                    {session.user.userName}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.certificateSection}>
            <div className={styles.sectionHeader}> Certificates </div>
            <div className={styles.row}>
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={index}
                  onClick={PdfForm.generatePdf}
                  className={styles.certificateItem}
                  style={{
                    backgroundImage: 'url("/certificate.jpg")',
                    borderRadius: '10px',
                    backgroundSize: 'cover',
                  }}
                >
                  {userData && (
                  <PdfForm
                    templatePdf="/certificate.pdf"
                    firstName={userData.firstName}
                    lastName={userData.lastName}
                    course={certificate.name}
                    date={certificate.date}
                    duration={certificate.duration}
                  />
                  )}
                </div>
              ))}
            </div>
            <div className={styles.paginationDots}>
              {Array.from({ length: totalPages }, (_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === currentPage ? styles.activeDot : ''}`}
                  onClick={() => handlePageChange(i)}
                >
                  .
                </span>
              ))}
            </div>
          </div>
          <div className={styles.coursesSection}>
            <div className={styles.sectionHeader}>Course Progress</div>
            <div className={styles.row}>
              {courseData.map((course) => (
                <div key={course} className={styles.courseItem}>
                  <div className={styles.courseName}>{course.name}</div>
                  <ProgressBar className={styles.progressBar} value={course.progress} color="green" isPopupDisplayed={profilePopup || passwordPopup} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.accountSection}>
            <div className={styles.sectionHeader}> Account </div>
            <div className={styles.accountRow}>
              <div className={styles.accountCol}>
                <div className={styles.sectionText}>Change Password</div>
                <div className={styles.subText}>
                  Set a different password to login to your account
                </div>
              </div>
              <div className={styles.accountCol}>
                <div
                  className={styles.arrow}
                  onClick={handleChangePassword}
                >
                  {' '}
                  {'>'}
                  {' '}
                </div>
              </div>
            </div>
            <div className={styles.accountRow}>
              <div className={styles.accountCol}>
                <div className={styles.sectionText} style={{ color: 'red' }}>Delete Account</div>
                <div className={styles.subText}>
                  Permanently delete the account and remove access from all resources
                </div>
              </div>
              <div className={styles.accountCol}>
                <div className={styles.arrow}>
                  {' '}
                  {'>'}
                  {' '}
                </div>
              </div>
            </div>
          </div>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null
  );
}

export default Profile;
