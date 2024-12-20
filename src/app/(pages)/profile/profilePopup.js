import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import profileData from './profileData';

function ProfilePopup({
  onClose,
  onIndexUpdate,
  currIndex,
  onSRCUpdate,
  profileImage,
}) {
  const [tempProfile, settempProfile] = useState(profileImage);
  function highlight(newIndex, URL) {
    onIndexUpdate(newIndex);
    settempProfile(URL);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popUp}>
        <div className={styles.popTop}>
          <div className={styles.popTitle}>Profile</div>
          <div>
            <Image
              src="/profile/close_btn.svg"
              width={24}
              height={24}
              alt="close-btn"
              onClick={onClose}
              className={styles.popClose}
            />
          </div>
        </div>
        <div className={styles.popMiddle}>
          <div className={styles.popSubTitle}>Change Avatar</div>
          <div className={styles.popText}>
            Choose from our selection of avatars to customize and display on
            your profile!
          </div>
          <div className={styles.popPicAll}>
            {profileData.map((course, index) => (
              <div key={index}>
                <Image
                  width={100}
                  height={100}
                  className={
                    index === currIndex ? styles.active : styles.popPic
                  }
                  onClick={() => {
                    highlight(index, course.imageSrc);
                    // console.log(profileData[index].imageSrc);
                  }}
                  src={course.imageSrc}
                  alt="profile pic variation"
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.popBottom}>
          <div className={styles.popButton} onClick={onClose}>
            Cancel
          </div>
          <div
            className={styles.popButton}
            onClick={() => {
              if (typeof currIndex !== 'number') {
                alert(
                  'Please select an image to change your avatar to or press cancel'
                );
              } else {
                onClose();
                onSRCUpdate(tempProfile);
              }
            }}
          >
            Change Avatar
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
