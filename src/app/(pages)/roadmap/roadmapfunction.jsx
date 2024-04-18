'use client'

import React from 'react';
import Image from "next/image";
import LinearWithValueLabel from './progressbar';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

// Define a component for rendering SVG paths with dual colors
const SVGPath = ({ id, d, completed }) => {
  // Determine the appropriate width and height for each SVG based on the id
  const dimensions = {
    "1": { width: 200, height: 350 },
    "2": { width: 218, height: 295 },
    "3": { width: 132, height: 205 },
    "4": { width: 227, height: 356 },
    "5": { width: 150, height: 149 }
  };

  return (
    <svg
      width={dimensions[id].width}
      height={dimensions[id].height}
      viewBox={`0 0 ${dimensions[id].width} ${dimensions[id].height}`}
      fill="none"
    >
      {/* pathway */}
      {completed && (
        <path
          d={d.path}
          stroke="#FFFFFD"
          strokeOpacity="0.8"
          strokeWidth="24"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};

// Object containing the SVG path data for each step
const svgPathData = {
  "1": {
    path: "M12.0689 115C.4022 71.1667 38.3689 -9.7 163.569 17.5"
  },
  "2": {
    path: "M191.127 12C211.104 52.3509 238.073 123.816 69.768 148.61C-51.1347 166.421 41.7999 310.501 129.698 276.956"
  },
  "3": {
    path: "M12 193C31.6761 193 46.5425 18.1129 120 12"
  },
  "4": {
    path: "M126.257 12C175.139 12 232.596 72.9269 208.207 128.822C169.868 216.689 87.9181 142.801 29.4507 230.668C-17.3232 300.961 44.8569 339.008 80.0013 344"
  },
  "5": {
    path: "M13.5521 148.899C6.98032 149.756 0.95798 145.124 0.100795 138.552C-0.75639 131.98 3.87618 125.958 10.4479 125.101L13.5521 148.899ZM62.5 64.5C62.5 29.1538 91.1538 0.5 126.5 0.5C161.846 0.5 190.5 29.1538 190.5 64.5C190.5 99.8462 161.846 128.5 126.5 128.5C91.1538 128.5 62.5 99.8462 62.5 64.5ZM10.4479 125.101C24.6253 123.252 47.3852 117.577 68.5185 106.725C89.7981 95.7982 107.74 80.5172 115.253 60.3171L137.747 68.6829C127.26 96.8828 103.285 115.852 79.4815 128.075C55.5315 140.373 30.0413 146.748 13.5521 148.899L10.4479 125.101Z"
  },
};

function Roadmap({ title, steps }) {
  const router = useRouter();

  // Function to handle step navigation
  const navigateToStep = (path) => {
    router.push(path);
  };

  // Calculate the total progress
  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const totalProgress = (completedSteps / totalSteps) * 100;

  return (
      <>
        <div className={styles.headerContainer}>
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
              style={{ width: '50%' }} // Apply inline styling to decrease width
              />
        </div>

        <div className={styles.roadmapContainer}>
          <Image 
          src= "/roadmap_step3.svg"
          width ={1000}
          height ={500}
          />
        </div>

  </>
  );
}

export default Roadmap;


