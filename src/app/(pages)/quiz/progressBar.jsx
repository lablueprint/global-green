import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            borderRadius: 5, // This applies rounded corners to the container
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'green',
              borderRadius: 5, // This applies rounded corners to the bar itself
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function LinearWithValueLabel({ value }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LinearWithValueLabel;
