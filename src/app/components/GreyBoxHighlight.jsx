'use client';

import { React } from 'react';
import styles from './page.module.css';

const data = [
  [
    '1. It all begins with an oil well. Petrochemical companies extract crude oil from the Earth’s crust and pipe it to a processing facility, where it is subjected to extreme heat and pressure in order to purify, refine, and distill these natural resources into various component molecules.',
  ],
  [
    '2. The processing facility uses industrial equipment to turn those natural resources into pellets like those pictured below to expedite shipping and manufacturing. Similarly,',
    'recycled plastic can be broken back down into flakes',
    'so that they can be used in the same process.',
  ],
];

export default function GreyBoxHighlight() {
  return (
    <div className={styles['grey-box-highlight']}>
      <inline className={styles['title-text1']}>So what can we do?</inline>

      {/* Map data to text here */}

      <br />
      <br />

      {' '}
      <span style={{ color: 'green' }}>  </span>

    </div>
  );
}
