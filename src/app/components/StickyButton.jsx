'use client';

import { React } from 'react';
import styles from './page.module.css';

export default function StickyButton() {
  return (
    <div>
      <button
        type="submit"
        className={styles['sticky-button']}
        onClick={() => { console.log(1); }}
        disabled={false}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        Go to quiz
      </button>
    </div>
  );
}
