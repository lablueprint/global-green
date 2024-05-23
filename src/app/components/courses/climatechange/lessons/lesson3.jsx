'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import styles from '../../page.module.css';

const content1 = [
  ['Because climate change operates on local, regional, and global levels, our approaches must be similarly ambitious in scope. For this reason, international collaboration has become a key part of our strategy to combat climate change. In this lesson, we’ll look at some of the ways people have begun to collaborate across borders to implement effective climate solutions.'],
];

const content2 = [
  ['<title>Global Policies: The Paris Agreement & Kyoto Protocol</title>'],
  ['One of the most significant measures taken to address climate change in recent years was the Paris Agreement, which was adopted by 196 parties in 2015. The Paris Agreement serves as an acknowledgement and testament to the pressing need for solutions in an era of rapidly changing climates. The agreement operates on a voluntary basis, allowing each country to determine its contributions to the collective effort. Parties who signed the agreement seek to limit the rise of global temperatures to below 2 degrees C above pre-industrial levels, with many committing to limit it to 1.5 degrees. While 2 degrees C may not sound like much, this increase in temperature is substantial enough to cause massive changes within delicately-balanced ecosystems.'],
  ['Of course, the Paris Agreement is only one of many existing and potential agreements of this type. Many international coalitions have been formed by nations, environmentalist groups, and concerned citizens to address these issues. Other examples of international cooperation in addressing climate change include The Kyoto Protocol, which also focuses on reducing emissions from industrialized nations, who are the primary source of GHG emissions.'],
  ['<title>Global Scale for Environmental Policies</title>'],
  ['The effectiveness of global policies hinges on the commitment and collaboration of nations. Despite measures such as the Paris Agreement and Kyoto Protocol, many challenges remain on the global stage. Disparities in economic development, technological capacities, and historical contributions to emissions create complexities in negotiations. Striking a balance between the responsibilities of developed nations and the aspirations of emerging economies remains a delicate task.'],
  ['As we have continued to develop international strategies for climate change mitigation, it has become clear that the fate of our planet depends on a robust coalition of diverse groups who can tackle the causes of climate change and implement innovative solutions. By fostering cooperation, dialogue, and embracing sustainable solutions, we can bridge differences and build a foundation for a climate resilient future.'],
];

function Course4Lesson3({ handleNext }) {
  return (
    <div className={styles['lesson-container']}>
      <LessonNumber lessonText="Lesson 3" />
      <TitleHeader title="Tackling Climate Change Across Borders" type="main" />
      <QuoteHighlight quoteText="No one person or country can reverse the effects of global warming and climate change." />
      <Textbox content={content1} />
      <img src="/lessons/33.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Go to quiz" callback={handleNext} />
    </div>
  );
}

export default Course4Lesson3;
