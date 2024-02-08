import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';
import styles from './results.module.css';

function CircularWithLabel({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size="100px"
        thickness={6}
        sx={{
          color: '#4caf50', // This is your progress color
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
          [`& .${circularProgressClasses.circle}`]: {
            // Use this line if the above does not work
            strokeLinecap: 'butt',
          },
          [`& .${circularProgressClasses.circle}`]: {
            // This will style the track
            opacity: 1, // You can increase this if needed
            color: 'green', // Light grey color for the track, make sure it is visible
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
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'black', // Text color
          }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularWithLabel.propTypes = {
  value: PropTypes.number.isRequired, // Add prop validation for 'value'
};

function calculateXP(correctAnswers) {
  return correctAnswers * 10; // Example: 10 XP for each correct answer
}

function Results({ points, totalQuestions }) {
  const percentage = ((points / totalQuestions) * 100).toFixed(0);
  return (
    <div className={styles.resultsContainer}>
      <h1>Quiz Results</h1>
      <div className={styles.scoreCard}>
        <div className={styles.progressCircle}>
          <CircularWithLabel value={Number(percentage)} />
        </div>
        <div className={styles.scoreDetails}>
          <p className={styles.goodJob}>Good Job!</p>
          <div className={styles.normalFont}>
            <p>
              Out of
              {' '}
              <strong>{totalQuestions}</strong>
              {' '}
              questions, you got:
            </p>
            <p className={styles.correct}>
              ✔
              {' '}
              <strong>
                {points}
              </strong>
              {' '}
              correct
            </p>
            <p className={styles.incorrect}>
              ✘
              {' '}
              <strong>{totalQuestions - points}</strong>
              {' '}
              incorrect
            </p>
          </div>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.xpCard}>
          <div className={styles.xpCardLines}>
            <p>
              You earned
              <br />
              <span className={styles.boldText}>
                {calculateXP(points)}
                XP
              </span>
              <br />
              <StarIcon sx={{ fontSize: '3rem', color: 'grey' }} />
            </p>
          </div>
        </div>
        <div className={styles.extraMessage}>
          <div className={styles.extraMessageLines}>
            <span className={styles.goodJob}> Your plant collection is growing! </span>
            <hi>Plant Image Here :)</hi>
          </div>
        </div>
      </div>
    </div>
  );
}

Results.propTypes = {
  points: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default Results;
