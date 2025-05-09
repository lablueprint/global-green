'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LinearWithValueLabel from './progressBar';
import styles from './page.module.css'; // Assume your CSS module is set up to reflect the design
import ChallengeBadge from '@/app/components/snackBar';

function CircularWithLabel({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size="100px"
        thickness={6}
        sx={{
          color: '#519546',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
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
            color: 'black',
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

function Results({ skips, usedHint, points, totalQuestions, questionResults }) {
  const percentage = ((points / totalQuestions) * 100).toFixed(0);

  // Function to render the question details. You can further customize it based on your needs.
  const renderQuestionDetails = (results, correct) =>
    results
      .filter((result) => result.isCorrect === correct)
      .map((result, index) => (
        <div key={index} className={styles.questionBox}>
          <p className={styles.questionNumber}>
            {`Question ${result.questionId + 1}: `}
          </p>

          <p className={styles.questionDetail}> {result.questionText}</p>
        </div>
      ));

  const router = useRouter();
  const { data: session } = useSession();
  const [complete3LessonsBadge, setComplete3LessonsBadge] = useState(false);
  const [complete5LessonsBadge, setComplete5LessonsBadge] = useState(false);
  const [completeFirstCourseBadge, setCompleteFirstCourseBadge] =
    useState(false);
  const [completeAllCoursesBadge, setCompleteAllCoursesBadge] = useState(false);
  const [highAchieverBadge, setHighAchieverBadge] = useState(false);
  const [noSkipsBadge, setNoSkipsBadge] = useState(false);
  const [noHintsBadge, setNoHintsBadge] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const courseKey = urlParams.get('courseKey');
  const currStage = parseInt(urlParams.get('stage'), 10);
  console.log(currStage);

  const changeProgress = async (userId, newStage, complete) => {
    try {
      const response = await fetch('/api/users/me/change-progress', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          courseKey,
          currStage: newStage,
          complete,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating course progress:', errorData.error);
      } else {
        const responseData = await response.json();
        console.log('Course progress updated successfully:', responseData);
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  const addBadge = async (userId, badge) => {
    try {
      const response = await fetch('/api/users/me/add-badge', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          badge,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error adding badge:', errorData.error);
      } else {
        const responseData = await response.json();
        console.log('Badge added successfully:', responseData);
      }
    } catch (error) {
      console.error('Error adding badge:', error);
    }
  };

  const [courseProgress, setCourseProgress] = useState({});
  const [userBadges, setUserBadges] = useState([]);

  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log('data', data);
    setCourseProgress(data.user.courses);
    setUserBadges(data.user.badges);
  };

  useEffect(() => {
    if (session) {
      getUserDetails(session.user.id);
      if (session.user.id === null) {
        return;
      }
      if (percentage >= 60) {
        let newStage = currStage + 1;

        if (percentage >= 80) {
          if (userBadges) {
            const badge = userBadges.find((badge) => badge === 'highAchiever');
            if (!badge) {
              setHighAchieverBadge(true);
              addBadge(session.user.id, 'highAchiever');
            }
          }
        }

        if (currStage === 6) {
          newStage = 6;
          const finishedCourses = courseProgress.filter(
            (course) => course.complete
          );

          if (finishedCourses.length === 0) {
            setCompleteFirstCourseBadge(true);
            addBadge(session.user.id, 'completeFirstCourse');
          }

          if (finishedCourses.length === 5) {
            setCompleteAllCoursesBadge(true);
            addBadge(session.user.id, 'completeAllCourses');
          }
        }

        console.log('good');
        console.log(newStage);
        changeProgress(session.user.id, newStage, newStage === 6);

        if (skips === 0) {
          if (userBadges) {
            const badge = userBadges.find((badge) => badge === 'noSkips');
            if (!badge) {
              setNoSkipsBadge(true);
              addBadge(session.user.id, 'noSkips');
            }
          }
        }

        if (usedHint === false) {
          if (userBadges) {
            const badge = userBadges.find((badge) => badge === 'noHints');
            if (!badge) {
              setNoHintsBadge(true);
              addBadge(session.user.id, 'noHints');
            }
          }
        }

        if (newStage === 3) {
          setComplete3LessonsBadge(true);
          addBadge(session.user.id, 'complete3Lessons');
        }
        if (newStage === 5) {
          setComplete5LessonsBadge(true);
          addBadge(session.user.id, 'complete5Lessons');
        }
      }
    }
  }, [session]);

  const handleContinue = () => {
    // router.push(`/quiz?courseKey=${courseKey}&stage=${currStage + 1}`);
    router.push(`/roadmap/course?courseKey=${courseKey}`);
    if (percentage >= 60) {
      const newStage = currStage + 1;
      const complete = newStage === 7;
      changeProgress(session.user.id, newStage, complete);
      console.log('good');
      console.log(newStage);
      // update the backend
      // userid = user id
      // course key = coursekey
      // currStage = currStage
      // complete is true if currStage = 7
    }
    console.log('k');
  };

  return (
    <div className={styles.overallResults}>
      <ChallengeBadge
        challengeName="Complete 3 lessons"
        challengePointValue="20"
        open={complete3LessonsBadge}
        handleClose={() => setComplete3LessonsBadge(false)}
      />
      <ChallengeBadge
        challengeName="Complete 5 lessons"
        challengePointValue="20"
        open={complete5LessonsBadge}
        handleClose={() => setComplete5LessonsBadge(false)}
      />
      <ChallengeBadge
        challengeName="Complete first course"
        challengePointValue="20"
        open={completeFirstCourseBadge}
        handleClose={() => setCompleteFirstCourseBadge(false)}
      />
      <ChallengeBadge
        challengeName="Complete all courses"
        challengePointValue="20"
        open={completeAllCoursesBadge}
        handleClose={() => setCompleteAllCoursesBadge(false)}
      />
      <ChallengeBadge
        challengeName="High achiever"
        challengePointValue="20"
        open={highAchieverBadge}
        handleClose={() => setHighAchieverBadge(false)}
      />
      <ChallengeBadge
        challengeName="No skips"
        challengePointValue="20"
        open={noSkipsBadge}
        handleClose={() => setNoSkipsBadge(false)}
      />
      <ChallengeBadge
        challengeName="No hints"
        challengePointValue="20"
        open={noHintsBadge}
        handleClose={() => setNoHintsBadge(false)}
      />

      <div className={styles.resultsContainer}>
        <div className={styles.quizTitleContainer}>Results</div>
        <div className={styles.progressbarandhintcontainer}>
          <div
            style={{
              position: 'absolute',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#454545',
            }}
            onClick={() =>
              router.push(`/roadmap/course?courseKey=${courseKey}`)
            }
          >
            &#10005;
          </div>
          <LinearWithValueLabel value={100} x={10} y={10} />
        </div>
        <div className={styles.x}>
          <div
            style={{
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '40px',
              marginBottom: '50px',
              marginTop: '80px',
            }}
          >
            Here&apos;s how you did...
          </div>
          <div className={styles.row1}>
            <div className={styles.scoreContainer}>
              <div className={styles.summaryDetails}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    marginBottom: '15px',
                    width: '300px',
                  }}
                >
                  {' '}
                  Summary{' '}
                </div>
                <div style={{ fontSize: '20px' }}>{`${points} Correct`} </div>
                <div style={{ fontSize: '20px' }}>
                  {`${totalQuestions - points} Incorrect`}
                </div>
                <div style={{ fontSize: '20px' }}>
                  {`${points} Points Earned`}
                </div>
              </div>
              <div className={styles.circularProgressContainer}>
                <CircularWithLabel value={Number(percentage)} />
                <div className={styles.stripedBorder} />
              </div>
            </div>
            <Image
              src="/results_flower.svg"
              width={400}
              height={320}
              className={styles.flowerContainer}
              alt="the flower according to course level"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={styles.continueButton}
            style={{
              borderRadius: '40px',
              background: 'var(--Green-100, #519546)',
              marginBottom: '60px',
              marginTop: '60px',
              display: 'flex',
              width: '160px',
              padding: '12px 32px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
              right: '0px',
              marginLeft: 'auto',
              marginRight: '80px',
            }}
            onClick={handleContinue}
          >
            Continue
          </Button>
          <div className={styles.questionResults}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              {' '}
              Incorrectly Answered {totalQuestions - points}/{totalQuestions}
            </div>

            {renderQuestionDetails(questionResults, false)}
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              {' '}
              Correctly Answered {points}/{totalQuestions}
            </div>
            {renderQuestionDetails(questionResults, true)}
          </div>
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
