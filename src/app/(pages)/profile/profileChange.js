import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import profileData from './profileData';

function ProfileChange({ onClose }) {
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
              <div key={course} className={styles.popPic} style={{ backgroundImage: `url(${course.background})` }} />
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

export default ProfileChange;
