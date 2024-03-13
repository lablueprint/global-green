import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({ value, x, y }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box sx={{ width: '85%', mr: 0, ml: 8 }}>
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
