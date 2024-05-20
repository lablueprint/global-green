'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { FaPencilAlt } from 'react-icons/fa';
import styles from './page.module.css';
import defaultProfilePic from './profilepic.jpg';
import PdfForm from './PdfForm';
import certData from './certData';
import courseData from '../landing/courseData';
import ProgressBar from './progressBar';
import ProfilePopup from './profilePopup';
import PasswordPopup from './changePasswordPopup';

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function CertificatePopup({ certificate, username, onClose, onDownload }) {
  console.log(formatDate(certificate.date));
  return (
    <div className={styles.overlay}>
      <div className={styles.popUp}>
        <div className={styles.popTop}>
          <div className={styles.popTitle}>Certificate</div>
          <div className={styles.popClose} onClick={onClose}>x</div>
        </div>
        <div className={styles.popContent}>
          <Image
            src="/popupcertificate.svg"
            alt="Certificate Preview"
            width={668}
            height={516}
          />
          <div className={styles.popMiddle}>
            <div className={styles.popupCertificateName}>{username}</div>
            <div className={styles.popupCertificateInfo}>has successfully completed</div>
            <div className={styles.popupCertificateCourseName}>{certificate.name}</div>
            <div className={styles.popupCompletion}><span>Completed on </span>
            <strong>{formatDate(certificate.date)}</strong></div>
          </div>
          <div className={styles.popBottom}>
            <button className={`${styles.popButton} ${styles.cancelButton}`} onClick={onClose}>Cancel</button>
            <button className={`${styles.popButton} ${styles.downloadButton}`} onClick={() => onDownload(certificate)}>Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [editedName, setEditedName] = useState('');
  const [userData, setData] = useState({});
  const [profilePopup, setProfilePopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const getUserDetails = async () => {
        const response = await fetch('/api/users/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: session.user.id }),
        });
        const data = await response.json();
        if (data.user) {
          setData(data.user);
          setEditedName(data.user.userName);
        }
      };
      getUserDetails();
    }
  }, [session]);
  
  const updateUserData = (newData) => {
    const updateUserDataInDB = async () => {
      const response = await fetch('/api/users/me/change-name', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: newData.userName, userId: newData.id }),
      });
      const res = await response.json();
      if (!res.error) {
        setData(newData);
        localStorage.setItem('userData', JSON.stringify(newData));
      } else {
        alert(res.error);
      }
    };
    updateUserDataInDB();
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

  const handleCertificateClick = (event, certificate) => {
    event.preventDefault();  
    event.stopPropagation(); 
    setSelectedCertificate(certificate);
    setShowPopup(true);
  };

  const handleDownloadPdf = (certificate) => {
    const pdfUrl = `/certificate.pdf`;
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${certificate.name}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(e => console.error('Download error:', e));
  };
  return (
    userData
      ? (
        <div className={styles.container}>
          <div className={styles.pageName}> Profile </div>

          {profilePopup && <ProfilePopup onClose={handleCloseProfile} />}
          {passwordPopup && <PasswordPopup onClose={handleClosePassword} />}

          {showPopup && (
            <CertificatePopup
            certificate={selectedCertificate}
            username={editedName}
            onClose={() => setShowPopup(false)}
            onDownload={handleDownloadPdf}
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
                onClick={(e) => handleCertificateClick(e, certificate)}
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
