import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import profileData from './profileData';

function ProfilePopup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popUp}>
        <div className={styles.popTop}>
          <div className={styles.popTitle}>Profile</div>
          <div className={styles.popClose} onClick={onClose}> x </div>
        </div>
        <div className={styles.popMiddle}>
          <div className={styles.popSubTitle}>Change Avatar</div>
          <div className={styles.popText}>
            Choose from our selection of avatars to customize and display on your profile!
          </div>
          <div className={styles.popPicAll}>
            {profileData.map((course) => (
              <div key={course.name} className={styles.popPic}>
                <Image width={100} height={100} src={course.imageSrc} alt="profile pic variation" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.popBottom}>
          <div className={styles.popButton} onClick={onClose}>Cancel</div>
          <div className={styles.popButton}>Change Avatar</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
