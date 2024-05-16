'use client';

import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function QuoteHighlight({ quoteText }) {
  return (
    <div className={styles['quote-highlight']}>
      {quoteText}
    </div>
  );
}

QuoteHighlight.propTypes = {
  quoteText: PropTypes.string.isRequired,
};
