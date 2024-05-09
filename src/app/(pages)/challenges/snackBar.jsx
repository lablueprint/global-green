import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import styles from "./page.module.css";

export default function CustomizedSnackbars({
  challengeName,
  challengePointValue,
  open,
  handleClose,
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          // severity="success"
          //   variant="filled"
          icon={false}
          //  severity="success"
          className={styles.alert}
          sx={{ width: "100%" }}
        >
          <div className={styles.rectangle}></div>
          <div className={styles.alertContainer}>
            <Image
              className={styles.bookIcon}
              height="48"
              width="43"
              src="https://global-green-2.s3.us-west-1.amazonaws.com/Badge.png"
              alt="icon"
            />

            <div className={styles.textDiv}>
              <p className={styles.challengeCompletedText}>
                Challenge Completed!
              </p>
              <p className={styles.challengeDescriptionText}>{challengeName}</p>
            </div>
          </div>

          <div className={styles.pointsBottomBorder}>
            <Image
              className={styles.snackbarPointsIcon}
              height="15"
              width="13"
              src="https://global-green-2.s3.us-west-1.amazonaws.com/pointsIcon.svg"
              alt="icon"
            />
            <p className={styles.snackbarPointsText}> +{challengePointValue}</p>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}
