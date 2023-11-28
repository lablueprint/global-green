import React from 'react';
import styles from './map.module.css';

function Map() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.exampleText}>
          Example text!
        </div>
        <div className={styles.anotherOne}>
          2nd Example!
        </div>
      </div>
      <br />
    </>
  );
}

export default Map;
