import React from 'react';
import styles from './page.module.css';

function Example() {
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

export default Example;
