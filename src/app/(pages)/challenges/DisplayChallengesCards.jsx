/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "./page.module.css";
import SimpleSnackbar from "./snackBar";
import Button from "@mui/material/Button";

// fetches too many times and numerator
// how to track points
function DisplayChallengesCards(props) {
  const [challengesArray, setChallengesArray] = useState([]);

  const { data: session } = useSession();
  // const [isEditing, setIsEditing] = useState(false);
  // const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [userData, setData] = useState({});
  const [points, setPoints] = useState(0);

  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch("/api/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).catch((err) => {
      console.log("err", err.response.data);
    });

    const data = await response.json();
    setData(data);
    setPoints(data.user.points.toString());
  };

  useEffect(() => {
    if (session) getUserDetails(session.user.id);
  }, [session]);
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

  const arrayCompletionExplorer = [true, true, true, false, false, false];

  return (
    <div>
      <p className={styles.challengesTitle}>{props.challengeTypeFilter}</p>
      <p className={styles.challengeDescription}>
        {props.challengeDescription}
      </p>
      <div className={styles.container}>
        <div className={styles.container}>
          {challengesArray.Challenges &&
            challengesArray.Challenges.filter(
              (challenge) =>
                challenge.challengeType === props.challengeTypeFilter
            ).map((challenge, index) => {
              return (
                <div key={index}>
                  <div
                    className={
                      arrayCompletionExplorer[index]
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
                        ></Image>
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
                            arrayCompletionExplorer[index]
                              ? challenge.icon
                              : challenge.blackandwhiteicon
                          }
                          alt="icon"
                        ></Image>
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
                    <div></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default DisplayChallengesCards;
