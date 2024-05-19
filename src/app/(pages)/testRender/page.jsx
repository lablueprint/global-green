'use client';

import { React } from 'react';
import styles from './page.module.css';
import Dropdown from '@/app/components/Dropdown';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

export default function Page() {
  const text = [
    ['1This part of the text should be black and ',
      '1this part of the text should be green and ',
      '1this part of the text should be black and ',
      '1this part of the text should be green and ',
      '1this part of the text should be black and ',
      '1this part of the text should be green and ',
      '1this part of the text should be black and ',
      '1this part of the text should be green and ',
      '1this part of the text should be black.'],
    ['2This part of the text should be black and ',
      '2this part of the text should be green and ',
      '2this part of the text should be black and ',
      '2this part of the text should be green and ',
      '2this part of the text should be black and ',
      '2this part of the text should be green and ',
      '2this part of the text should be black and ',
      '2this part of the text should be green and ',
      '2this part of the text should be black and ',
      '2this part of the text should be green and ',
      '2this part of the text should be black and ',
      '2this part of the text should be green and ',
      '2this part of the text should be black.'],
    ['3This part of the text should be black and ',
      '3this part of the text should be green and ',
      '3this part of the text should be black and ',
      '3this part of the text should be green and ',
      '3this part of the text should be black.'],
  ];

  const dropdownData = [
    {
      title: 'Lesson 1: Where Does Blarp Come From?',
      content: text,
    },
    {
      title: 'Lesson 2: Where Does Glarp Come From?',
      content: text,
    },
    {
      title: 'Lesson 3: Where Does Flarp Come From?',
      content: text,
    },
    {
      title: 'Lesson 4: Where Does Flarmph Come From?',
      content: text,
    },
  ];

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

        <Dropdown parts={dropdownData} />
        <Textbox content={text} />
        <GreyBoxHighlight content={text} />
      </div>
    </div>
  );
}
