'use client';

import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function StickyButton({ text, callback }) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkScrollBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight * 0.95) {
        setIsEnabled(true);
      }
    };

    window.addEventListener('scroll', checkScrollBottom);

    return () => { window.removeEventListener('scroll', checkScrollBottom); };
  }, []);
  return (
    <div>
      <button
        type="submit"
        className={styles['sticky-button']}
        onClick={callback}
        disabled={!isEnabled}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        {text}
      </button>
    </div>
  );
}

StickyButton.propTypes = {
  text: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
