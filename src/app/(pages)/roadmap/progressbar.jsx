import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// value is the progress of the bar (current progress of the bar)
// so if it is at 50, half of the progress bar will be filled up
// x is current value (numerator)
// y is the total (denominator)
function LinearProgressWithLabel({ value, x, y }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'left', width: '100%'}}>
      <Box sx={{ minWidth: 35, mr: -7, position: 'relative' }}>
        <Typography
          style={{
            fontSize: '0.60rem',
            color: '#606060',
            lineHeight: '1',
            fontFamily: 'Arial',
            textAlign: 'right',
          }}
        >
          {`${x}/${y}`}
          hi
        </Typography>
      </Box>
      <Box sx={{ width: '25%', mr: 0, ml: 8}}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            borderRadius: 5,
            border: '1px solid black',
            height: '10px', 
            backgroundColor: '#ffffff',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1D594B',
              borderRadius: 5,
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35, ml: 1, position: 'relative' }}>
        <Typography
          style={{
            fontSize: '0.60rem',
            color: '#606060',
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
};

function LinearWithValueLabel({ value, x, y }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} x={x} y={y} />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default LinearWithValueLabel;
