import styles from './results.module.css'; 
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function CircularWithLabel({ value }) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={value}
          size="100px" // Adjust the size as needed
          thickness={10} // Adjust the thickness of the circle as needed
          sx = {{
            color: "green",
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
            color="textSecondary"
            style={{
                fontSize: '1.2rem', 
                color: 'black',  
                fontWeight: 'bold' 
            }}
          >{`${value}%`}</Typography>
        </Box>
      </Box>
    );
  }
function Results({ points, totalQuestions }) {
  const percentage = ((points / totalQuestions) * 100).toFixed(0);

  return (
    <div className={styles.resultsContainer}>
      <h1>Quiz Results</h1>
      <div className={styles.goodJob}>Good Job!</div>
      <div className={styles.scoreCard}>
        <div className={styles.progressCircle}>
          <CircularWithLabel value={Number(percentage)} />
        </div>
        <div className={styles.scoreDetails}>
          <p>Out of {totalQuestions} questions, you got:</p>
          <p className={styles.correct}>✔ {points} correct</p>
          <p className={styles.incorrect}>✘ {totalQuestions - points} incorrect</p>
        </div>
      </div>

      <div className={styles.xpCard}>
        You earned <strong>{calculateXP(points)} XP</strong>
      </div>

      <div className={styles.extraMessage}>
        Something about their plant collection growing
      </div>
    </div>
  );
}

function calculateXP(correctAnswers) {
  return correctAnswers * 10; // Example: 10 XP for each correct answer
}

export default Results;
