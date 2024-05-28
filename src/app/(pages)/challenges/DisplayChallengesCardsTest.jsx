/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "./page.module.css";

// fetches too many times and numerator
// how to track points
function DisplayChallengesCardsTest(props) {
  const [challengesArray, setChallengesArray] = useState([]);
  const { challengeTypeFilter, challengeDescription, badges } = props;

  async function fetchData() {
    console.log("fetched");

    const res = await fetch("/api/challenges");
    const fetchdata = await res.json();

    setChallengesArray(fetchdata);
  }
  useEffect(() => {
    if (!challengesArray.length) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <p className={styles.challengesTitle}>{challengeTypeFilter}</p>
      <p className={styles.challengeDescription}>
        {challengeDescription}
      </p>
      <div className={styles.container}>
        <div className={styles.container}>
          {
            badges.map((badge, index) => (
              <div key={index}>
                <div
                  className={
                    badge.key
                      ? styles.activeBorder
                      : styles.inactiveBorder
                    }
                >
                  <div className={styles.inner}>
                    <div className={styles.pointsBorder}>
                      <Image
                        className={styles.pointsIcon}
                        height="12"
                        width="10"
                        src="https://global-green-2.s3.us-west-1.amazonaws.com/pointsIcon.svg"
                        alt="icon"
                      />
                      <p className={styles.pointsText}>
                        {" "}
                        {JSON.stringify(20)}
                      </p>
                    </div>
                    <div>
                      <Image
                        className={styles.icon}
                        height="48"
                        width="48"
                        src="https://global-green-2.s3.us-west-1.amazonaws.com/solar_flag-2-bold-duotone.svg"
                        alt="icon"
                      />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.cardTitle}>
                        {badge.key}
                      </p>
                      <p className={styles.description}>
                        {badge.key}
                      </p>
                      <p className={styles.date}>
                        Completed {badge.date ? badge.date : "sometime ago"}
                      </p>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
            ))
}
        </div>
      </div>
    </div>
  );
}

export default DisplayChallengesCardsTest;
