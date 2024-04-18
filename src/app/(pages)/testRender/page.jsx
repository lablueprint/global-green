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
        {/* 1. Stickied buttons */}
        <button type="submit" className={styles['sticky-button']}>Go to quiz</button>
        <button type="submit" disabled className={styles['sticky-button']}>Go to quiz</button>
        <button type="submit" className={styles['sticky-button']}>Next</button>
        <button type="submit" disabled className={styles['sticky-button']}>Next</button>

        {/* 2. Grey Box Highlight */}
        <div className={styles['grey-box-highlight']}>
          <inline className={styles['title-text1']}>So what can we do?</inline>
          <br />
          <br />
          1. It all begins with an oil well. Petrochemical companies extract crude oil
          from the Earth’s crust and pipe it to a processing facility, where it is
          subjected to extreme heat and pressure in order to purify, refine, and distill
          these natural resources into various component molecules.
          <br />
          <br />
          2. The processing facility uses industrial equipment to turn those natural
          resources into pellets like those pictured below to expedite shipping and
          manufacturing. Similarly, recycled plastic can be broken back down into flakes
          so that they can be used in the same process.
        </div>

        {/* 3. Lesson Number */}
        <div className={styles['lesson-number']}>
          Lesson 2
        </div>

        {/* 4. Quote Highlight */}
        <div className={styles['quote-highlight']}>
          Now that we know what a plasticsmith does, let&apos;s take a quick
          look at the marvelous machines that make it all possible
        </div>

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
