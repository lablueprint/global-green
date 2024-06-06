/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import SimpleSnackbar from "../../components/snackBar";
import DisplayChallengesCards from "./DisplayChallengesCards";
// fetches too many times and numerator
// how to track points
function challenges() {
  const [challengesArray, setChallengesArray] = useState([]);

  const { data: session } = useSession();
  // const [isEditing, setIsEditing] = useState(false);
  // const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const [userData, setData] = useState({});
  const [seeds, setSeeds] = useState(0);
  const [badges, setBadges] = useState([]);

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
    setSeeds(data.user.seeds.toString());
    setBadges(data.user.badges);
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

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpen = () => {
    setOpenSnackbar(true);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const arrayCompletionExplorer = [
    badges.find((badge) => badge.key === "EcoExplorer"),
    badges.find((badge) => badge.key === "GardenStroll"),
    badges.find((badge) => badge.key === "personalizer"),
  ];

  const arrayCompletionGardener = [
    badges.find((badge) => badge.key === "buyThreeAccessories"),
    badges.find((badge) => badge.key === "buySixAccessories"),
    badges.find((badge) => badge.key === "buyThreeBackgrounds"),
  ];

  const arrayCompletionScholar = [
    badges.find((badge) => badge.key === "complete1Lesson"),
    badges.find((badge) => badge.key === "completeFirstCourse"),
    badges.find((badge) => badge.key === "completeThreeCourses"),
  ];

  const arrayCompletionAce = [
    badges.find((badge) => badge.key === "bullseye"),
    badges.find((badge) => badge.key === "PerfectPrecision"),
    badges.find((badge) => badge.key === "QuizChampion"),
    badges.find((badge) => badge.key === "independent"),
    badges.find((badge) => badge.key === "SuperIndependent"),
    badges.find((badge) => badge.key === "skip-free"),
  ];

  return (
    <div className={styles.everything}>
      <Button onClick={handleOpen}>Open Snackbar</Button>
      <SimpleSnackbar
        challengeName="meow"
        challengePointValue="393"
        open={openSnackbar}
        handleClose={handleClose}
      />

      <p className={styles.title}>Challenges</p>
      <DisplayChallengesCards
        challengeTypeFilter="Explorer"
        challengeDescription="Description about Explorer challenges"
        array={arrayCompletionExplorer}
      />

      <DisplayChallengesCards
        challengeTypeFilter="Gardener"
        challengeDescription="Description about Gardener challenges"
        array={arrayCompletionGardener}
      />

      <DisplayChallengesCards
        challengeTypeFilter="Scholar"
        challengeDescription="Description about Scholar challenges"
        array={arrayCompletionScholar}
      />

      <DisplayChallengesCards
        challengeTypeFilter="Ace"
        challengeDescription="Description about Ace challenges"
        array={arrayCompletionAce}
      />
    </div>
  );
}

export default challenges;
