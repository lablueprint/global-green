'use client';
import React, { useState } from 'react';
import LinearWithValueLabel from '../quiz/progressBar';
import styles from './page.module.css'; 


function Quiz() {
  const [progress, setProgress] = useState(0); // Initialize progress

  // Handler for correct answer
  const handleCorrectAnswer = () => {
    setProgress(prevProgress => Math.min(prevProgress + 10, 100)); // Increase progress by 10%, max 100%
  };

  // Handler for incorrect answer
  const handleIncorrectAnswer = () => {
    setProgress(prevProgress => Math.min(prevProgress - 10, 100)); // Increase progress by 10%, max 100%
  };

  return (
    <div>
      <h1>Module 2: Buying Responsibly</h1>
      <LinearWithValueLabel value={progress} />
      <div className={styles.container}>
        <p className={styles.p}>[Your question here]</p>
        <div className={styles.div}></div>
        <button className={styles.button} onClick={handleCorrectAnswer}>Correct Answer</button>
        <button className={styles.button} onClick={handleIncorrectAnswer}>Incorrect Answer</button>
        <button className={styles.button}></button>
        <button className={styles.button}></button>
      </div>
    </div>
  );
}

export default Quiz;