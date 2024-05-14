'use client';

import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function TextImageRight({ uri }) {
  console.log(uri);
  return (
    <div className={styles['text-image-horizontal']}>
      <div className={styles['text-part']}>
        <inline className={styles['title-text2']}>Shredder</inline>
        <br />
        The shredder is the plasticsmith’s bread and butter. As the name suggests,
        it allows one to shred pieces of plastic into more uniform pieces, which
        makes them easier to work with and transport.
      </div>
      <img src="/lessons/1.png" alt="test" className={styles['image-part']} />
    </div>
  );
}

TextImageRight.propTypes = {
  uri: PropTypes.string.isRequired,
};
