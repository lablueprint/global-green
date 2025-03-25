'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

function WelcomeUser({ userName }) {
  const [displayName, setDisplayName] = useState(userName || 'User');

  useEffect(() => {
    if (userName) {
      setDisplayName(userName);
    }
  }, [userName]);

  return (
    <div className={styles.welcome}>
      <h1>
        Welcome, <span className={styles.userName}>{displayName}</span>
      </h1>
    </div>
  );
}

export default WelcomeUser;
