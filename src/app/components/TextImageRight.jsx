import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';
import Textbox from './Textbox';

export default function TextImageRight({ contentArray }) {
  return (
    <div className={styles['text-image-horizontal']}>
      <div className={styles['text-part']}>
        <br />
          <Textbox content={contentArray[0].text} />
      </div>
      <img src={contentArray[0].image} alt="test" className={styles['image-part']} />
    </div>
  );
}


