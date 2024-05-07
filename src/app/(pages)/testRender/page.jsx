'use client';

import { React } from 'react';
import styles from './page.module.css';

export default function Page() {
  return (
    <div style={{
      padding: '15%',
      border: '1px solid black',
    }}
    >
      <div style={{
        display: 'flex', gap: 20, flexDirection: 'column', justifyContent: 'space-between',
      }}
      >

        {/* 5. Text + Image Horizontal (Image Right) */}
        <div className={styles['text-image-horizontal']}>
          <div className={styles['text-part']}>
            <inline className={styles['title-text2']}>Shredder</inline>
            <br />
            The shredder is the plasticsmith’s bread and butter. As the name suggests,
            it allows one to shred pieces of plastic into more uniform pieces, which
            makes them easier to work with and transport.
          </div>
          {/* TODO: Left off at image */}
          <div className={styles['image-part']}>image goes here</div>
        </div>
      </div>
    </div>
  );
}
