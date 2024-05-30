'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

function Onboarding() {
  const images = [
    { content: 'Slide 1' },
    { content: 'Slide 2' },
    { content: 'Slide 3' },
    { content: 'Slide 4' },
    { content: 'Slide 5' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles.container}>
        <div className={styles.title}>
          Global Green Scholar
        </div>
        <div className={styles['carousel-container']}>
          <div className={styles['carousel-slide']}>
            <div className={styles['carousel-content']}>{images[currentSlide].content}</div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles['carousel-button']} onClick={prevSlide}>
            Previous
          </button>
          <div className={styles.dots}>
            {images.map((image, index) => (
              <div
                className={currentSlide !== index ? styles.dot : styles['active-dot']}
                onClick={() => { setCurrentSlide(index); }}
              />
            ))}
          </div>
          <button type="button" className={styles['carousel-button']} onClick={nextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
