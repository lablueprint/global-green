'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg';
// Assuming you have a default profile pic
import PdfForm from './PdfForm';
// import courseData from '../landing/courseData';
import ProgressBar from './progressBar';
import ProfilePopup from './profilePopup';
import PasswordPopup from './passwordPopup';
import ChallengeBadge from '@/app/components/snackBar';

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
    // console.log('here', data);
    setData(data.user);
    console.log(userData);
    setEditedName(data.user.userName);
    setCertData(data.user.certificates);
    if (!data.user.profilePic) {
      setProfileImage(defaultProfilePic);
    } else {
      setProfileImage(data.user.profilePic);
    }
    setCourseProgress(data.user.courses);
    if (data.user.badges) {
      const badge = data.user.badges.find((badge) => badge.key === 'visitProfile');
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
        console.log('res', res);
        setVisitProfileBadge(true);
      }
    }
  };

  const deleteAccount = async () => {
    // delete the user account from the database
    async function deleteAccountFromDB() {
      const response = await fetch('/api/users/me/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const res = await response.json();
      if (res.error) {
        // eslint-disable-next-line no-alert
        alert(res.error);
        throw new Error(res.error);
      }
      // eslint-disable-next-line no-console
      console.log('Account deleted', response.data);
    }
    deleteAccountFromDB();

    // logout the user
    handleLogout();

    // delete the user account from the local storage
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    console.log('session', session);
    if (session) getUserDetails(session.user.id);

    // fetch the courses data from the database
    async function fetchCoursesData() {
      const response = await fetch('/api/courses');
      const data = await response.json();
      console.log('data', data);
      setCourseData(data.res);
    }
    fetchCoursesData();
  }, [session]);

  const updateUserDataPic = (data, newpic) => {
    // update the user data in the database, make sure only the first user is updated.
    async function updatePicDB() {
      // eslint-disable-next-line no-console
      console.log('newpic', data.profilePic);
      console.log('data', data);
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
      // eslint-disable-next-line no-console
      console.log('newpic', newpic);
      console.log('res', res2);

      if (res2.error) {
        // eslint-disable-next-line no-alert
        alert(res2.error);
        throw new Error(res2.error);
      }
      // eslint-disable-next-line no-console
      console.log('Update success', response2.data);
    }
    updatePicDB();

    // update the user data in the local storage
    // localStorage.setItem("userData", JSON.stringify(data));
  };

  const updateUserDataName = (data) => {
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
    updateUserDataName(userData);
  };

  const handleChangeProfileImage = (event) => {
    setProfilePopup(true);
    // here's the issue
  };

  const handleChangeProfileIndex = (newIndex) => {
    setCurrIndex(newIndex);
  };

  const handleChangeProfileSRC = (newSRC) => {
    setProfileImage(newSRC);
    console.log('173', newSRC);
    userData.profilePic = newSRC;
    localStorage.setItem('userData', JSON.stringify(userData));
    updateUserDataPic(userData, newSRC);
    console.log('176');
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

  console.log('certData', certData);
  const startIndex = currentPage * 3;
  const displayedCertificates = certData.slice(
    startIndex,
    startIndex + 3,
  );
  const totalPages = Math.ceil(displayedCertificates.length / 3);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                <div className={styles.username} onClick={handleNameClick}>
                  {userData.userName}
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
        <div className={styles.coursesSection}>
          <div className={styles.sectionHeader}>Course Progress</div>
          <div className={styles.row}>
            {courseData
            && courseProgress
            && courseData.map((course) => (
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
            <div className={styles.accountCol}>
              <div className={styles.sectionText}>Change Password</div>
              <div className={styles.subText}>
                Set a different password to login to your account
              </div>
            </div>
            <div className={styles.accountCol}>
              <div className={styles.arrow} onClick={handleChangePassword}>
                {' '}
                {'>'}
                {' '}
              </div>
            </div>
          </div>
          <div className={styles.accountRow}>
            <div className={styles.accountCol}>
              <div className={styles.sectionText} style={{ color: 'red' }}>
                Delete Account
              </div>
              <div className={styles.subText}>
                Permanently delete the account and remove access from all
                resources
              </div>
            </div>
            <div className={styles.accountCol}>
              <div className={styles.arrow} onClick={deleteAccount}>
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
    </>
  ) : null;
}

export default Profile;
