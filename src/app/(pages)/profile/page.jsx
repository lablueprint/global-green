/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

// Profile.jsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg';
import PdfForm from './PdfForm';
import ProgressBar from './progressBar';
import ProfilePopup from './profilePopup';
import PasswordPopup from './passwordPopup';
import ChallengeBadge from '@/app/components/snackBar';
import ConfirmDeletePopup from './ConfirmDeletePopup'; // import the new component

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [editedName, setEditedName] = useState('');
  const [userData, setData] = useState({});
  const [certData, setCertData] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [profilePopup, setProfilePopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currIndex, setCurrIndex] = useState();
  const [courseData, setCourseData] = useState([]);
  const [visitProfileBadge, setVisitProfileBadge] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

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
    setData(data.user);
    setEditedName(data.user.userName);
    setCertData(data.user.certificates);
    setProfileImage(data.user.profilePic || defaultProfilePic);
    setCourseProgress(data.user.courses);

    if (data.user.badges) {
      const badge = data.user.badges.find(
        (badge) => badge.key === 'visitProfile'
      );
      if (!badge) {
        const response = await fetch('/api/users/me/add-badge', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: data.user._id,
            badge: 'visitProfile',
          }),
        });
        const res = await response.json();
        setVisitProfileBadge(true);
      }
    }
  };

  const deleteAccount = async () => {
    const response = await fetch('/api/users/me/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: session.user.id }),
    });
    const res = await response.json();
    if (res.error) {
      alert(res.error);
      throw new Error(res.error);
    }
    handleLogout();
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    if (session) getUserDetails(session.user.id);

    async function fetchCoursesData() {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourseData(data.res);
    }
    fetchCoursesData();
  }, [session]);

  const updateUserDataPic = (data, newpic) => {
    async function updatePicDB() {
      const response2 = await fetch('/api/users/me/change-picture', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePic: data.profilePic,
          userId: data._id,
        }),
      });
      const res2 = await response2.json();
      if (res2.error) {
        alert(res2.error);
        throw new Error(res2.error);
      }
    }
    updatePicDB();
  };

  const updateUserDataName = (data) => {
    async function updateUserDataInDB() {
      const response = await fetch('/api/users/me/change-name', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: data.userName, userId: data._id }),
      });
      const res = await response.json();
      if (res.error) {
        alert(res.error);
        throw new Error(res.error);
      }
    }
    updateUserDataInDB();
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
    updateUserDataName(userData);
  };

  const handleChangeProfileImage = (event) => {
    setProfilePopup(true);
  };

  const handleChangeProfileIndex = (newIndex) => {
    setCurrIndex(newIndex);
  };

  const handleChangeProfileSRC = (newSRC) => {
    setProfileImage(newSRC);
    userData.profilePic = newSRC;
    localStorage.setItem('userData', JSON.stringify(userData));
    updateUserDataPic(userData, newSRC);
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

  const startIndex = currentPage * 3;
  const displayedCertificates = certData.slice(startIndex, startIndex + 3);
  const totalPages = Math.ceil(displayedCertificates.length / 3);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeletePopup(false);
    deleteAccount();
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  return userData ? (
    <>
      <ChallengeBadge
        challengeName="Visit the profile"
        challengePointValue="20"
        open={visitProfileBadge}
        handleClose={() => setVisitProfileBadge(false)}
      />
      <div className={styles.container}>
        {showDeletePopup && (
          <ConfirmDeletePopup
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        )}
        <div className={styles.pageName}> Profile </div>
        {profilePopup && (
          <ProfilePopup
            onClose={handleCloseProfile}
            onIndexUpdate={handleChangeProfileIndex}
            currIndex={currIndex}
            onSRCUpdate={handleChangeProfileSRC}
            profileImage={profileImage}
          />
        )}
        {passwordPopup && (
          <PasswordPopup
            onClose={handleClosePassword}
            userName={userData.email}
          />
        )}
        <div className={styles.profileSection}>
          <Image
            src={profileImage}
            alt="Profile"
            width={120}
            height={120}
            style={{ borderRadius: '50%', cursor: 'pointer' }}
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
              <div className={styles.username} onClick={handleNameClick}>
                {userData.userName}
              </div>
            )}
          </div>
        </div>
        <div className={styles.certificateSection}>
          {displayedCertificates.length === 0 ? (
            ''
          ) : (
            <div className={styles.certificateSection}>
              <div className={styles.sectionHeader}>Certificates</div>
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
                        userName={`${userData.firstName} ${userData.lastName}`}
                        course={certificate.key}
                        date={certificate.date}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.paginationDots}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${
                      i === currentPage ? styles.activeDot : ''
                    }`}
                    onClick={() => handlePageChange(i)}
                  >
                    .
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={styles.sectionHeader}>Course Progress</div>
          <div className={styles.row}>
            {courseData &&
              courseProgress &&
              courseData.map((course) => (
                <div key={course.key} className={styles.courseItem}>
                  <div className={styles.courseName}>{course.label}</div>
                  <ProgressBar
                    className={styles.progressBar}
                    value={
                      courseProgress.find((item) => item.key === course.key)
                        ? courseProgress.find((item) => item.key === course.key)
                            .currStage
                        : 0
                    }
                    maxValue={7}
                    color="green"
                    isPopupDisplayed={profilePopup || passwordPopup}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.accountSection}>
          <div className={styles.sectionHeader}> Account </div>
          <div className={styles.accountRow}>
            <div className={styles.accountClick}>
              <div className={styles.accountCol}>
                <div className={styles.sectionText}>Change Password</div>
                <div className={styles.subText}>
                  Set a different password to login to your account
                </div>
              </div>
              <div className={styles.arrow} onClick={handleChangePassword}>
                {'>'}
              </div>
            </div>
          </div>
          <div className={styles.accountRow}>
            <div className={styles.accountClick}>
              <div className={styles.accountCol}>
                <div className={styles.sectionText} style={{ color: 'red' }}>
                  Delete Account
                </div>
                <div className={styles.subText}>
                  Permanently delete the account and remove access from all
                  resources
                </div>
              </div>
              <div className={styles.arrow} onClick={handleDeleteClick}>
                {'>'}
              </div>
            </div>
          </div>
        </div>
        <button
          className={styles.logout_btn}
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  ) : null;
}

export default Profile;
