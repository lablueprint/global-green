'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';
import styles from '../../page.module.css';

const content1 = [
  ['This has caused a boom in the carbon offset industry, which aims to help individuals and businesses counteract their impact on the environment through a variety of methods. This can entail projects like planting trees, funding renewable energy, waste management, and environmental restoration programs. In theory, funding these projects helps us to counteract the deleterious effects of our carbon footprints, but is it really that simple?'],
  ['<title>Carbon Offsetting</title>'],
  ['Carbon offsets purport to provide individuals with a means of contributing to environmental conservation and restoration projects in exchange for <green>carbon offset credits</green>. Individuals may then use these credits to deduct from their total emissions. In theory, you can purchase enough offset credits to fully counteract your carbon footprint. If you fully offset your carbon footprint, you are <green>carbon neutral.</green>'],
  ['Let’s look at a fictional example of carbon offsetting to better understand how it works:'],
];

const content2 = [
  ['1. Margaret has to fly for work conferences several times a year. Because she knows that plane travel produces a large amount of emissions, she wants to find a way to counteract her contribution to climate change. She uses averages and estimates to calculate her carbon footprint and concludes that she contributes around 16 tons of carbon annually.'],
  ['2. Margaret finds a carbon offset provider, ECO, online (Note: this is not intended to be a real carbon offset provider). She reviews the projects and programs that they fund, which include landfill gas capture and renewable energy.'],
  ['3. Margaret purchases carbon offset credits from ECO that equate to a reduction of 16 tons of CO2 emissions per year.'],
  ['4. ECO uses the money from people who purchase offset credits, like Margaret, to fund additional programs.'],
];

const content3 = [
  ['In essence, carbon offset credits are a way for individuals to help fund and transfer credit for eco-friendly projects. They are not, however, a replacement for implementing other sustainable practices into your lifestyle. That’s because the best way to mitigate the harmful effects of emissions is to focus on emitting less to begin with. However, well-deployed carbon offset credit programs can be a meaningful way to supplement these efforts.'],
  ['<title>Criticisms of Carbon Offset Credits</title>'],
  ['It’s worth noting some of the criticisms and downsides to carbon offset credits. Firstly, it’s important to understand that carbon offset credits are based on estimates of how much a particular project will counterbalance carbon emissions. How does one calculate, with certainty, how many tons of emissions are absorbed by a particular tree in a forest? Additionally, it’s possible for carbon offsets providers to overestimate a project’s contribution to emissions reduction. Moreover, not every carbon offset provider and project are created equal. It requires diligence and research on the part of the person purchasing the offset credit to ensure that their purchase will have a real, demonstrable effect on reducing emissions.'],
  ['Another key criticism of carbon offsetting is that it enables individuals and businesses to claim carbon neutrality without making substantive changes to their policies and operations. Because of this, some companies may elect to purchase offset credits rather than making more concrete changes, such as installing renewable energy, creating recycling programs, preventing pollution, and other sustainability initiatives. Committing to carbon neutrality is not simply a marketing scheme; it requires genuine care and deliberate effort in a variety of forms, of which carbon offsets are only one.'],
];

function Course5Lesson4({ handleNext }) {
  return (
    <div className={styles['lesson-container']}>
      <LessonNumber lessonText="Lesson 4" />
      <TitleHeader title="Can You Really Offset Your Carbon Footprint" type="main" />
      <QuoteHighlight quoteText="Given how we all contribute to emissions in direct and indirect ways every day, many people wonder if there’s a way they can limit their carbon footprint beyond integrating sustainable practices into their travel plans and daily lives." />
      <Textbox content={content1} />
      <GreyBoxHighlight content={content2} />
      <Textbox content={content3} />
      <StickyButton text="Go to quiz" callback={handleNext} />
    </div>
  );
}

export default Course5Lesson4;
