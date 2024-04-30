import React from 'react';
import Roadmap from '../roadmap';

const key = 'climate-change'; // for example

function climate_change() {
  return (
    <Roadmap
      courseKey="course_4"
      title="Climate Change"
      currStage={6}
      courseInfo="Climate change information."
    />
  );
}
export default climate_change;
