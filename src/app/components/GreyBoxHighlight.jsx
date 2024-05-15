'use client';

import { React } from 'react';
import styles from './page.module.css';
import Textbox from './Textbox';

export default function GreyBoxHighlight({ content }) {
  return (
    <div className={styles['grey-box-highlight']}>
      <Textbox content={content} />
    </div>
  );
}