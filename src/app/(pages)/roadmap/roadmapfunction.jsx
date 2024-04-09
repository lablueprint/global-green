'use client'

//src/app/(pages)/roadmap/[roadmap].jsx
import React from 'react';
import LinearWithValueLabel from './progressbar';
import styles from './page.module.css'
import { useRouter } from 'next/navigation'


function Roadmap({ title, steps }) {
  if (!Array.isArray(steps)) {
    console.error('Roadmap component expects "steps" to be an array');
    return null;
  }
  
  // storing the total number of steps
  const totalSteps = steps.length;

  // counting the number of completed steps
  const completedSteps = steps.filter(step => step.completed).length; // Counting completed steps
  
  // converting total progress into a percentage for the progress bar 
  const totalProgress = (completedSteps / totalSteps) * 100

  const router = useRouter()


  // Function to handle step navigation
  const navigateToStep = (path) => {
    router.push(path);
  };  

  
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p>Courses &gt; {title}</p>
      </div>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>

      <LinearWithValueLabel
            value={totalProgress}
            x={completedSteps}
            y={totalSteps}
      />

      {steps.map((step, index) => (
        <div key={step.id} className={styles.stepContainer}>    
          <button
            type="button"
            disabled={!step.completed} 
            className={`${styles.step} ${step.completed ? styles.stepCompleted : styles.stepIncomplete}`}
            onClick={() => router.push(step.path)}
          ></button>
            {step.completed ? '✓' : index + 1}
          {index < steps.length - 1 && <div className={styles.connector} />}
        </div>
      ))}
    </div>
  );
}

export default Roadmap;