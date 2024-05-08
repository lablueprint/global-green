'use client';

import { React } from 'react';
import styles from './page.module.css';

export default function QuoteHighlight({quoteText}) {
  return (
    <div className={styles['quote-highlight']}>
      {quoteText}
    </div>
  );
}
