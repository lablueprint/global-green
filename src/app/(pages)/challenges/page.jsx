/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "./page.module.css";
import SimpleSnackbar from "./snackBar";
import Button from "@mui/material/Button";
import DisplayChallengesCards from "./DisplayChallengesCards";

// fetches too many times and numerator
// how to track points
function challenges() {
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

  const updateUserData = (data) => {
    // update the user data in the database, specifically, the points values
    async function updateUserDataInDB() {
      // eslint-disable-next-line no-console
      const response = await fetch("/api/users/me/update-points", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          points: data.user.points,
          userId: data.user._id,
        }),
      });
      const res = await response.json();
      // eslint-disable-next-line no-console
      console.log("res", res);

      if (res.error) {
        // eslint-disable-next-line no-alert
        alert(res.error);
        throw new Error(res.error);
      }

      // eslint-disable-next-line no-console
      console.log("Update success", response.data);
    }
    updateUserDataInDB();

    // update the user data in the local storage
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const handlePointsChange = (updatedValue) => {
    userData.user.points = updatedValue;
    updateUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  async function addPointsButton(
    index,
    points,
    setPoints,
    challenge,
    handlePointsChange
  ) {
    const pointsElement = document.getElementById(`points_${index}`);
    const buttonElement = document.getElementById(`button_${index}`);

    if (pointsElement.innerHTML !== "Claimed") {
      const pointsToAdd = Number(challenge.pointsToEarn);
      buttonElement.style.backgroundColor = "grey";
      pointsElement.innerHTML = "Claimed";

      const updatedValue = await new Promise((resolve) => {
        setPoints((prevPoints) => {
          const newValue = Number(prevPoints) + Number(pointsToAdd);
          resolve(newValue); // Resolve the Promise with the updated value
          return newValue; // Return the updated value for immediate update
        });
      });

      handlePointsChange(updatedValue);
    }
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpen = () => {
    setOpenSnackbar(true);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const arrayCompletionExplorer = [true, true, true, false, false, false];

  const arrayCompletionGardener = [true, true, true, false, false, false];

  const arrayCompletionScholar = [true, true, true, false, false, false];

  const arrayCompletionAce = [true, true, true, false, false, false];

  return (
    <div className={styles.everything}>
      <Button onClick={handleOpen}>Open Snackbar</Button>
      <SimpleSnackbar
        challengeName={"meow"}
        challengePointValue={"393"}
        open={openSnackbar}
        handleClose={handleClose}
      ></SimpleSnackbar>

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
