import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './page.module.css';

function LinearProgressWithLabel({
  value, maxValue, color, isPopupDisplayed,
}) {
  return (
    <Box sx={{
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      width: '100%',
    }}
    >
      <Typography
        style={{
          color: 'black',
          fontSize: '14px',
          lineHeight: '1',
          fontFamily: 'Arial',
          textAlign: 'left',
          width: '100px',
        }}
      />
      <Box
        sx={{
          flex: 1,
          margin: 0.6,
          zIndex: isPopupDisplayed ? -1 : 1,
        }}
        className={`${styles.progressWrapper}`}
      >
        <LinearProgress
          variant="determinate"
          value={(value / maxValue) * 100}
          sx={{
            borderRadius: 5,
            border: '1px solid black',
            width: 'calc(100% - 2px)',
            height: '10px',
            backgroundColor: 'white',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 5,
            },
          }}
        />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isPopupDisplayed: PropTypes.bool.isRequired,
  maxValue: PropTypes.number.isRequired,
};

function LinearWithValueLabel({
  value, color, isPopupDisplayed, maxValue,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel
        value={value}
        color={color}
        isPopupDisplayed={isPopupDisplayed}
        maxValue={maxValue}
      />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isPopupDisplayed: PropTypes.bool.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default LinearWithValueLabel;
