import React from 'react';
import styles from './page.module.css';

const PopupMessage = ({ message, itemName, itemImage, onClose }) => {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.message}>
          {message}
          <br />
          <span className={styles.itemName}>{itemName}</span>
        </div>
        {itemImage && <img src={itemImage} alt="Item purchased" className={styles.itemImage} />}
        <div className={styles.PopupButtons}>
            <button className={styles.AddLaterButton}>Add Later </button>
            <button className={styles.AddToGardenButton}> Add to Garden </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
