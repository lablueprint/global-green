import { useEffect } from 'react';
import styles from './page.module.css';

function WelcomeUser({ userName }) {
  return (
    <div className={styles.welcome}>
      <h1>
        Welcome,{' '}
        <span className={styles.userName}>{userName ? userName : 'User'}</span>
      </h1>
    </div>
  );
}

export default WelcomeUser;
