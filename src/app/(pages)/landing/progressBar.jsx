import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({
  value, maxValue, x, y, color,
}) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '0 10px',
    }}
    >
      <Typography
        style={{
          color: 'black',
          fontSize: '14px',
          lineHeight: '1',
          fontFamily: 'Arial',
          textAlign: 'left',
          flex: 1, // Allow the course name to grow flexibly
        }}
      />
      <Box sx={{ width: '100%', margin: 0.75 }}>
        <LinearProgress
          variant="determinate"
          value={(value / maxValue) * 100}
          sx={{
            borderRadius: 5,
            border: '1px solid black',
            width: '100px',
            height: '10px',
            backgroundColor: 'white',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 5,
            },
          }}
        />
      </Box>
      <Box sx={{
        minWidth: 35,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0.5,
      }}
      >
        <Typography
          style={{
            color: 'black',
            fontSize: '14px',
            lineHeight: '1',
            fontFamily: 'Arial',
            textAlign: 'left',
          }}
        >
          {`${x}/${y}`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
};

function LinearWithValueLabel({
  value, x, y, color, maxValue,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel
        value={value}
        x={x}
        y={y}
        color={color}
        maxValue={maxValue}
      />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default LinearWithValueLabel;
