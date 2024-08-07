'use client';

import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function TitleHeader({ title, type }) {
  return (
    <div className={styles.container}>
      <h1 className={type === 'main' ? styles.mainTitle : styles.subTitle}>{title}</h1>
    </div>
  );
}

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
