import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Image from "next/image";
import LinearWithValueLabel from "./progressBar";
import styles from "./page.module.css"; // Assume your CSS module is set up to reflect the design

function CircularWithLabel({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size="100px"
        thickness={6}
        sx={{
          color: "#519546",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function Results({ points, totalQuestions, questionResults }) {
  const percentage = ((points / totalQuestions) * 100).toFixed(0);

  // Function to render the question details. You can further customize it based on your needs.
  const renderQuestionDetails = (results, correct) =>
    results
      .filter((result) => result.isCorrect === correct)
      .map((result, index) => (
        <div key={index} className={styles.questionBox}>
          <p className={styles.questionNumber}>{`Question ${
            result.questionId + 1
          }: `}</p>

          <p className={styles.questionDetail}> {result.questionText}</p>
        </div>
      ));
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.quizTitleContainer}>Results</div>
      <div className={styles.progressbarandhintcontainer}>
        <div
          style={{
            position: "absolute",
            cursor: "pointer",
            fontSize: "12px",
            color: "#454545",
          }}
          onClick={() => console.log("bye bye")}
        >
          &#10005;
        </div>
        <LinearWithValueLabel
          value={totalQuestions}
          x={totalQuestions}
          y={totalQuestions}
        />
      </div>
      <div className={styles.x}>
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "40px",
            marginBottom: "15px",
            marginTop: "60px",
          }}
        >
          Here's how you did...
        </div>
        <div className={styles.row1}>
          <div className={styles.scoreContainer}>
            <div className={styles.summaryDetails}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginBottom: "15px",
                  width: "300px",
                }}
              >
                {" "}
                Summary{" "}
              </div>
              <div style={{ fontSize: "20px" }}>{`${points} Correct`} </div>
              <div style={{ fontSize: "20px" }}>{`${
                totalQuestions - points
              } Incorrect`}</div>
              <div
                style={{ fontSize: "20px" }}
              >{`${points} Points Earned`}</div>
            </div>
            <div className={styles.circularProgressContainer}>
              <CircularWithLabel value={Number(percentage)} />
              <div className={styles.stripedBorder} />
            </div>
          </div>
          <Image src="/results_flower.svg" width={400} height={300} />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={styles.continueButton}
          style={{
            borderRadius: "40px",
            background: "var(--Green-100, #519546)",
            marginBottom: "60px",
            marginTop: "60px",
            display: "flex",
            width: "160px",
            padding: "12px 32px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            position: "relative",
            right: "0px",
            marginLeft: "auto",
            marginRight: "80px",
          }}
        >
          Continue
        </Button>
        <div className={styles.questionResults}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            {" "}
            Incorrectly Answered {totalQuestions - points}/{totalQuestions}
          </div>

          {renderQuestionDetails(questionResults, false)}
          <div
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            {" "}
            Correctly Answered {points}/{totalQuestions}
          </div>
          {renderQuestionDetails(questionResults, true)}
        </div>
      </div>
    </div>
  );
}

Results.propTypes = {
  points: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  questionResults: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      selectedAnswer: PropTypes.string.isRequired,
      questionText: PropTypes.string.isRequired,
      // Include other properties you may need, like correctAnswer, questionText, etc.
    })
  ).isRequired,
};

export default Results;
