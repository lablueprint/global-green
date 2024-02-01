import React from 'react';
import styles from './page.module.css';

function Example() {
  return (
    <>
      <div className={styles.daniel}>

        <div className={styles.exampleText}>
          Example text! hi this is Daniel
        </div>

        <br />

        <div className={styles.anotherOne}>
          2nd Example!
        </div>

      </div>    
      </>
  );
}

export default Example;
