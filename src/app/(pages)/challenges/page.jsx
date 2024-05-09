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
  const [alertQueue, setAlertQueue] = useState([]);

  const handleOpen = () => {
    setOpenSnackbar(true);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const [challengeTitle, setChallengeTitle] = useState("meg");
  const [challengePoints, setChallengePoints] = useState("123");
  useEffect(() => {
    if (alertQueue.length > 0 && !openSnackbar) {
      const { title, points } = alertQueue[0];
      setChallengeTitle(title);
      setChallengePoints(points);

      setOpenSnackbar(true);
      // Remove the displayed alert from the queue
      setAlertQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [alertQueue, openSnackbar]);
  //index, challenge.pointsToEarn,challenge.challengeTitle.toString()
  const completionAlert = (index, points, title) => {
    console.log(index, points, title);

    if (arrayCompletion[index] === true && arrayNotif[index] === false) {
      // setChallengeTitle(title);
      // setChallengePoints(points);
      setAlertQueue((prevQueue) => [...prevQueue, { title, points }]);
      // handleOpen();
      setArrayNotif((prevArrayNotif) => {
        const newArrayNotif = [...prevArrayNotif];
        newArrayNotif[index] = true;
        return newArrayNotif;
      });
    }
  };

  const arrayCompletion = [true, true, true, false, false, false];
  const [arrayNotif, setArrayNotif] = useState([
    false,
    true,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className={styles.everything}>
      <Button onClick={handleOpen}>Open Snackbar</Button>
      <SimpleSnackbar
        challengeName={challengeTitle}
        challengePointValue={challengePoints}
        open={openSnackbar}
        handleClose={handleClose}
      ></SimpleSnackbar>
      <p className={styles.title}>Challenges</p>
      <p className={styles.challengesTitle}>Explorer</p>
      <p className={styles.challengeDescription}>
        {" "}
        Description about Explorer challenges
      </p>

      <div className={styles.container}>
        {challengesArray.Challenges &&
          challengesArray.Challenges.map((challenge, index) => {
            console.log("meow");
            completionAlert(
              index,
              challenge.pointsToEarn,
              challenge.challengeTitle.toString()
            );
            return (
              <div key={index}>
                <div
                  className={
                    arrayCompletion[index]
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
                          arrayCompletion[index]
                            ? "https://global-green-2.s3.us-west-1.amazonaws.com/solar_flag-2-bold-duotone.svg"
                            : "https://global-green-2.s3.us-west-1.amazonaws.com/blackandwhiteflag.svg"
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

                    {/* <p> +{JSON.stringify(challenge.pointsToEarn)}</p> */}
                  </div>
                  <div></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default challenges;

{
  /* {5 / JSON.stringify(challenge.denominator) >= 1 && (
                <div>
                  <div>
                    <CheckCircleIcon className={styles.check} />
                  </div>
                  <div
                    className={
                      (styles.cardcontainer, styles.completedcardBorder)
                    }
                  >
                    <div className={styles.cardInner}>
                      <Image
                        className={styles.lessonImage}
                        src={challenge.icon.toString()}
                        alt="Lesson Image"
                        width={74}
                        height={74}
                      />

                      <p className={styles.completedcardTitle}>
                        {challenge.challengeTitle.toString()}
                      </p>

                      <div
                        id={`button_${index}`}
                        className={styles.completedleafPoints}
                        onClick={() =>
                          addPointsButton(
                            index,
                            points,
                            setPoints,
                            challenge,
                            handlePointsChange
                          )
                        }
                      >
                        <div className={styles.points}>
                          <p id={`points_${index}`}>
                            {" "}
                            Claim +{JSON.stringify(challenge.pointsToEarn)}
                          </p>
                        </div>

                        <Image
                          className={styles.leafImage}
                          src="/eco.png"
                          alt="Lesson Image"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )} */
}

{
  /* <div className={(styles.cardcontainer, styles.cardBorder)}>
        <div className={styles.cardInner}>
          <Image
            className={styles.lessonImage}
            src="/solar_cup-first-bold-duotone.png"
            alt="Lesson Image"
            width={74}
            height={74}
          />

          <div>
            <p className={styles.cardTitle}>testable button</p>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(numerator / 4) * 100}%`,
                }}
              >
                <span className={styles.overlayText}>
                  {numerator}/{4}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.leafPoints}>
            <div className={styles.points}>
              <p> +{75}</p>
            </div>
            <div>
              <Image
                className={styles.leafImage}
                src="/eco.png"
                alt="Lesson Image"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setNumerator(numerator + 1);
          }}
        >
          increase count
        </button>
      </div> */
}

// const data = [
//   {
//     challengeTitle: "Complete your first course",
//     numerator: "0",
//     denominator: "4",
//     pointsToEarn: "50",
//     icon: "/solar_cup-first-bold-duotone.png",
//   },
//   {
//     challengeTitle: "Complete 2 lessons",
//     numerator: "4",
//     denominator: "4",
//     pointsToEarn: "50",
//     icon: "/solar_cup-first-bold-duotone.png",
//   },
//   {
//     challengeTitle: "Complete 2 lessons",
//     numerator: "4",
//     denominator: "4",
//     pointsToEarn: "50",
//     icon: "/solar_cup-first-bold-duotone.png",
//   },
// ];

// function CardComponent({ cardDetails }) {
//   const [numerator, setNumerator] = useState(0);
//   const [points, setPoints] = useState(0);

//   return (
//     <div>
//       <p> Total amount of points: {points}</p>

//       {cardDetails.map((card, index) => (
//         <div key={index}>
//           {card.numerator / card.denominator < 1 && (
//             <div className={(styles.cardcontainer, styles.cardBorder)}>
//               <div className={styles.cardInner}>
//                 <div>
//                   <Image
//                     className={styles.lessonImage}
//                     src={card.icon}
//                     alt="Lesson Image"
//                     width={74}
//                     height={74}
//                   />
//                 </div>
//                 <div>
//                   <p className={styles.cardTitle}>{card.challengeTitle}</p>
//                   <div className={styles.progressBar}>
//                     <div
//                       className={styles.progressFill}
//                       style={{
//                         // width: `${(card.numerator / card.denominator) * 100}%`,
//                         width: `${(card.numerator / card.denominator) * 100}%`,
//                       }}
//                     >
//                       <span className={styles.overlayText}>
//                         {card.numerator}/{card.denominator}
//                         {/* {card.denominator} */}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.leafPoints}>
//                   <div className={styles.points}>
//                     <p> +{card.pointsToEarn}</p>
//                   </div>
//                   <div>
//                     <Image
//                       className={styles.leafImage}
//                       src="/eco.png"
//                       alt="Lesson Image"
//                       width={100}
//                       height={100}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           {card.numerator / card.denominator >= 1 && (
//             <div>
//               <div>
//                 <CheckCircleIcon className={styles.check} />
//               </div>
//               <div
//                 className={(styles.cardcontainer, styles.completedcardBorder)}
//               >
//                 <div className={styles.cardInner}>
//                   <Image
//                     className={styles.lessonImage}
//                     src={card.icon}
//                     alt="Lesson Image"
//                     width={74}
//                     height={74}
//                   />

//                   <p className={styles.completedcardTitle}>
//                     {card.challengeTitle}
//                   </p>

//                   <div
//                     id={`button_${index}`}
//                     className={styles.completedleafPoints}
//                     onClick={() => {
//                       if (
//                         document.getElementById(`points_${index}`).innerHTML !==
//                         "Claimed"
//                       ) {
//                         setPoints(points + Number(card.pointsToEarn));
//                         document.getElementById(
//                           `button_${index}`
//                         ).style.backgroundColor = "grey";
//                         document.getElementById(`points_${index}`).innerHTML =
//                           "Claimed";

//                         setPoints(points + Number(card.pointsToEarn));
//                       }
//                     }}
//                   >
//                     <div className={styles.points}>
//                       <p id={`points_${index}`}> Claim +{card.pointsToEarn}</p>
//                     </div>

//                     <Image
//                       className={styles.leafImage}
//                       src="/eco.png"
//                       alt="Lesson Image"
//                       width={100}
//                       height={100}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
