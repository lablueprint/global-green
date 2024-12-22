import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// value is the progress of the bar (current progress of the bar)
// so if it is at 50, half of the progress bar will be filled up
// x is current value (numerator)
// y is the total (denominator)
export function LinearProgressWithLabel({ value, x, y }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
      <Box sx={{ minWidth: 35, mr: -7, position: 'relative' }}>
        <Typography
          style={{
            fontSize: '0.60rem',
            color: '#606060',
            lineHeight: '1',
            fontFamily: 'Arial',
            textAlign: 'right',
          }}
        />
      </Box>
      <Box sx={{ width: '30%', mr: 0, ml: 8 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            borderRadius: 5,
            border: '0px',
            height: '10px',
            backgroundColor: '#0D0D0D14',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#519546',
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
          {`${x - 1}/${y}`}
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

export function LinearWithValueLabel({ value, x, y }) {
  return (
    <Box
      sx={{
        width: '108%',
        margin: '0px',
        padding: '0px',
      }}
    >
      <LinearProgressWithLabel value={value} x={x} y={y} />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

// export default LinearWithValueLabel;
