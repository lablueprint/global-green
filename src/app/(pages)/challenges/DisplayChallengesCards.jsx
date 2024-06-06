/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "./page.module.css";

// fetches too many times and numerator
// how to track points
function DisplayChallengesCards(props) {
  const [challengesArray, setChallengesArray] = useState([]);

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
      <p className={styles.challengesTitle}>{props.challengeTypeFilter}</p>
      <p className={styles.challengeDescription}>
        {props.challengeDescription}
      </p>
      <div className={styles.container}>
        <div className={styles.container}>
          {challengesArray.Challenges
            && challengesArray.Challenges.filter(
              (challenge) => challenge.challengeType === props.challengeTypeFilter,
            ).map((challenge, index) => (
              <div key={index}>
                <div
                  className={
                      props.array[index]
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
                        {JSON.stringify(challenge.pointsToEarn)}
                      </p>
                    </div>
                    <div>
                      <Image
                        className={styles.icon}
                        height="48"
                        width="48"
                        src={
                          props.array[index]
                            ? challenge.icon
                            : challenge.blackandwhiteicon
                          }
                        alt="icon"
                      />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.cardTitle}>
                        {challenge.challengeTitle.toString()}
                      </p>
                      <p className={styles.description}>
                        {challenge.description.toString()}
                      </p>
                      <p className={styles.date}>
                        Completed {challenge.date.toString()}
                      </p>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayChallengesCards;
