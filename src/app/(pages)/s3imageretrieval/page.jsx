/* eslint-disable quotes */

"use client";

import React from "react";
// import AWS from "aws-sdk";
import Image from "next/image";
import styles from "./page.module.css";


// if you just want publicly accessible images that you can use the
// convertToURL to retrieve images from the bucket

function s3imageretrieval() {
  const imageSrc = convertToURL("Logo.png");

  return (
    <div className={styles.daniel}>
      <div className={styles.exampleText}>test aws</div>
      <Image width="100" height="100" src={imageSrc} alt="megan" />
      <br />
      <div className={styles.anotherOne}>2nd Example!</div>
    </div>
  );
}

export default s3imageretrieval;

// // for next.js keys, always include .NEXT_PUBLIC_ infront of it
// const s3 = new AWS.S3({
//   accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
//   secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
//   region: "us-west-1", // need region specified
// });

// const [image, setImage] = useState();

// // const command = new GetObjectCommand( {
// //   Key: "Logo.png",
// //   Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
// // })
// // const response = await s3.getsend(command)

// // const convertToURL = (imageName) =>
// //   `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${imageName}`;

// the .getObject is good for accessing private images because it goes through authentication
// const retrieveImage = async () => {
//   try {
//     const data = await s3
//       .getObject({
//         Key: "Logo.png",
//         Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
//       })
//       .promise();

//     return `data:${data.ContentType};base64,${Buffer.from(
//       data.Body,
//       "binary"
//     ).toString("base64")}`;
//   } catch (err) {
//     console.error(err);
//   }
// };
// // };
// useEffect(() => {
//   // Update the document title using the browser API

//   retrieveImage().then((data) => {
//     setImage(data);
//   });
// }, []);

// useEffect(() => {
//   console.log("image", image);
// }, [image]);
