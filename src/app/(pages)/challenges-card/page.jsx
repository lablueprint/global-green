/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./page.module.css";
// fetches too many times and numerator
// how to track points
function Example() {
  const [challengesArray, setChallengesArray] = useState([]);
  async function fetchData() {
    console.log("fetched");

    // if (localStorage.getItem("mapChallenges")) {
    //   setChallengesArray(JSON.parse(localStorage.getItem("mapChallenges")));
    //   console.log(challengesArray);
    // } else {
    // console.log("else");
    const res = await fetch("/api/challenges");
    const fetchdata = await res.json();
    console.log(fetchdata);
    setChallengesArray(fetchdata);
    // localStorage.setItem("mapChallenges", JSON.stringify(fetchdata));
    //  }
  }
  useEffect(() => {
    if (!challengesArray.length) {
      fetchData();
    }
  }, []);

  const [points, setPoints] = useState(0);
  return (
    <>
      {/* <p>{JSON.stringify(challengesArray)}</p> */}

      <p> Total amount of points: {points}</p>
      <div>
        {challengesArray.Challenges &&
          challengesArray.Challenges.map((challenge, index) => (
            <div key={index}>
              {1 / JSON.stringify(challenge.denominator) < 1 && (
                <div className={(styles.cardcontainer, styles.cardBorder)}>
                  <div className={styles.cardInner}>
                    <div>
                      <Image
                        className={styles.lessonImage}
                        src={challenge.icon.toString()}
                        alt="Lesson Image"
                        width={74}
                        height={74}
                      />
                    </div>
                    <div>
                      <p className={styles.cardTitle}>
                        {challenge.challengeTitle.toString()}
                      </p>

                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{
                            // width: `${(card.numerator / card.denominator) * 100}%`,
                            width: `${
                              (1 / JSON.stringify(challenge.denominator)) * 100
                            }%`,
                          }}
                        >
                          <span className={styles.overlayText}>
                            1/{JSON.stringify(challenge.denominator)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.leafPoints}>
                      <div className={styles.points}>
                        <p> +{JSON.stringify(challenge.pointsToEarn)}</p>
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
                </div>
              )}
              {5 / JSON.stringify(challenge.denominator) >= 1 && (
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
                        onClick={() => {
                          if (
                            document.getElementById(`points_${index}`)
                              .innerHTML !== "Claimed"
                          ) {
                            setPoints(
                              points +
                                Number(JSON.stringify(challenge.pointsToEarn))
                            );
                            document.getElementById(
                              `button_${index}`
                            ).style.backgroundColor = "grey";
                            document.getElementById(
                              `points_${index}`
                            ).innerHTML = "Claimed";

                            setPoints(
                              points +
                                Number(JSON.stringify(challenge.pointsToEarn))
                            );
                          }
                        }}
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
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default Example;

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
