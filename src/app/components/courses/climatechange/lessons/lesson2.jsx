'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import styles from '../../page.module.css';

const content1 = [
  ['In this lesson, we’ll dive into what we can do to play a part in rehabilitating and reversing some of the dire consequences of our exponential development and activities since the industrial revolution.'],
  ['<title>Sustainable Technology & Practices to Combat Climate Change</title>'],
  ['Mitigation in this context means reducing the severity of climate change by intervening and adapting our own practices and habits to better preserve our planet. We cannot undo the damage human activities have inflicted on ecosystems in the past, but we can take measures to counteract these changes and begin to reverse the effects.'],
  ['As our understanding of climate change has grown, we have begun to develop and implement many new technologies that can help us reduce our footprint on the climate and Earth’s ecosystems. Sustainable practices like transitioning to renewable energy sources, preserving terrestrial and marine ecosystems, and reducing waste are all means of mitigating our impact on climate change.'],
  ['Renewable energy sources such as solar, wind, hydropower, biomass, and geothermal offer viable alternatives to traditional fossil fuels. Using sustainable energy sources like solar, wind, and hydropower diminishes the carbon footprint of energy production and contributes to energy diversification and security. This means that we will not be wholly dependent on any one energy source.'],
];

const content2 = [
  ['<title>Individual Action Against Climate Change</title>'],
  ['Individual actions play a crucial role in climate change mitigation. On the individual level, we can seek to reduce our personal carbon footprints, advocate for sustainable practices in our communities, and participate in local efforts to combat climate change. While we cannot make an immediate transition to be perfectly sustainable in every aspect of our lives, introducing these measures on local and national levels will play a major role in giving us more time to address climate change before it becomes insurmountable.'],
  ['<title>Global Action and Cooperation Against Climate Change</title>'],
  ['Beyond the individual level, humans must also seek to cooperate on a global scale. Due to the interconnectedness of ecosystems and climate, humans will need to cooperate beyond borders in order to implement effective climate change mitigation strategies; international cooperation is fundamental in addressing the global nature of climate change. Collaboration on a global scale facilitates the exchange of knowledge, technology, and resources so that we can synergize our efforts. Through these efforts, we can also introduce <green>nature-based solutions</green>, such as reforestation, which can act as a carbon sink and provide us vital time to continue addressing global warming.'],
];

function Course4Lesson2({ handleNext }) {
  return (
    <div className={styles['lesson-container']}>
      <LessonNumber lessonText="Lesson 2" />
      <TitleHeader title="Climate Change Mitigation" type="main" />
      <QuoteHighlight quoteText="As we begin to see more and more effects of climate change, humans are also faced with the challenge of managing and addressing our impact on these patterns." />
      <Textbox content={content1} />
      <img src="/lessons/31.jpg" />
      <img src="/lessons/32.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Go to quiz" callback={handleNext} />
    </div>
  );
}

export default Course4Lesson2;
