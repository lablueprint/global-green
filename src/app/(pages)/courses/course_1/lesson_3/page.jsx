'use client';

import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['In fact, estimates indicate that we produce over 300 million tons of plastic globally each year, and a significant portion of that, <green>50%</green>, is single-use plastic intended to be discarded once it has served its purpose. It’s easy to take for granted that you can always grab another water bottle from the convenience store without ever thinking about where the last one you tossed out went.'],
  ['Contrary to how it may seem, however, there is not an infinite amount of plastic in the world; after all, it is made from nonrenewable resources like crude oil. That means that every bottle we discard is actually unique and non-renewable. So where did that last plastic water bottle you threw out end up?'],
];

const content2 = [
  ['<title>End Destination of  Plastics</title>'],
  ['There are a few different possible destinations for plastic that doesn’t make it to a recycling center. If you throw away your plastic water bottle in the trash it will likely end up in a landfill alongside other types of garbage. On the other hand, plastic litter often ends up getting caught in waterways where it can eventually make its way into the ocean. In either scenario, plastic pollution can accumulate until it causes severe environmental and ecological issues.'],
  ['<title>Landfills</title>'],
];

const content3 = [
  ['When thrown in the trash, plastic is transported to landfills. For every load of trash carried, a considerable amount of plastic escapes into the environment. Similarly, plastic can also be subjected to forces like wind and escape into the environment once it has arrived at a landfill, so even throwing plastic in the trash is far from a surefire way to prevent it from ending up in the ocean.'],
  ['On top of that, plastic aggregated in landfills is far from harmless! When exposed to environmental factors like sunlight, heat, and rain, plastics are able to leach out toxins that can be carried away in runoff and build up in soil. At the same time, these plastics slowly break down into small particles known as <green>microplastics</green> that can enter the atmosphere and contribute to global warming.'],
  ['<title>Garbage Patches</title>'],
  ['For plastic that is neither recycled nor transported to a landfill, it is very likely that it will be blown around the environment until it ends up in a waterway such as a lake or river. This results in about 10 million tons of plastic finding its way into the ocean each year. Once in the ocean, gyres (currents) push loose plastic together into massive clumps like the <green>Great Pacific Garbage Patch</green> (pictured below).'],
];

const content4 = [
  ['Garbage patches (and plastic pollution more broadly) have much greater downsides than simply making our oceans less beautiful. One of the most pressing problems is the toll that plastic pollution has on wildlife. Countless marine species are killed by plastic pollution each year: turtles get their heads stuck in plastic beer rings, fish mistake plastic for prey and eat it with toxic consequences, and garbage can cause bodily harm to species it comes into contact with. It is estimated that at least 100,000 animals die from plastic pollution each year. This is to say nothing of the toxins non-fatally ingested by wildlife, many of which are then sold as food in our supermarkets around the world. In this way, we also indirectly ingest plastic when we pollute the ocean.'],
  ['Plastic’s carbon footprint doesn’t end with its production, either. Plastic on the ocean surface and seafloor continuously emit methane and other greenhouse gasses. Microplastics may either aerosolize and escape into the atmosphere or remain in the water where it hinders microorganisms from absorbing GSGs like carbon, which results in greater quantities of these gasses in the atmosphere.'],
  ['Overall, plastic pollution is a major threat to global health. It hinders ecosystems, kills wildlife, releases GSGs, and gradually leaches toxins into the environment. '],
];

function Course1Lesson3() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '15%',
        paddingTop: '8%',
      }}
    >
      <LessonNumber lessonText="Lesson 3" />
      <TitleHeader title="Plastic Pollution" type="main" />
      <img src="/lessons/1.png" />
      <QuoteHighlight quoteText="New plastic is being made all the time." />
      <Textbox content={content1} />
      <img src="/lessons/6.jpg" />
      <Textbox content={content2} />
      <img src="/lessons/7.jpg" />
      <Textbox content={content3} />
      <img src="/lessons/8.png" />
      <Textbox content={content4} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 3'); }} />
    </div>
  );
}

export default Course1Lesson3;
