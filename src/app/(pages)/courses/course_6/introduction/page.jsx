import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ["On the face of it, this figure might not seem alarming. That is, until you understand how much plastic is produced globally on an annual basis. Despite the small percentage of plastic making its way into the ocean, this still equates to approximately 8-10 million metric tons (17.64 billion pounds) of plastic making its way into the ocean each year. This accounts for around 80% of all marine waste."]
]

const content2 = [
  ["<title>Danger of Ocean Plastic Pollution</title>"],
  ["The most dire part of this intense level of plastic pollution is that, once plastic enters waterways and oceans, it is incredibly difficult to fully remove it. This is true not only because there’s so much of it, but because large quantities of plastic sink to the ocean floor, and plastic takes hundreds or even thousands of years to break down. Even then, this is not a total relief to marine ecosystems. Upon breaking down, the plastic is not eliminated; it simply becomes microplastics. <green>Microplastics</green> are, as the name suggests, very small particles of plastic. Typically they are around or less than 5 millimeters long, which means that it is even more difficult to collect them from polluted ecosystems."],
  ["<title>Ocean Pollutants</title>"],
  ["As mentioned above, plastic only accounts for 80% of all marine waste/pollution. That remaining 20% is comprised of other pollutants that we’ll take a closer look at in this course. These pollutants include chemical contaminants from industrial processes (including agriculture), sewage and wastewater, and oil pollution (often resulting from oil spills). All of these pollutants carry with them the potential to cause severe harm to wildlife and ecosystems as a whole, so any effective solution at cleaning up our oceans will require us to tackle pollution from a variety of sources. At the same time, it will be pivotal for us not only to clean up existing pollution but begin to take measures to prevent pollutants from getting into our waterways and oceans to begin with."],
  ["In the final lesson of this course, we’ll dive into some exciting and innovative solutions that are being developed and proposed to address these issues. Microplastics and other pollutants may pose an existential threat to our marine ecosystems, but quick and decisive action may make the difference between a future with abundant life in our oceans rather than a slow, steady decline into an aquatic wasteland."]
]


function Course6Introduction() {
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
    <LessonNumber lessonText="Introduction"/>
    <TitleHeader title="Introduction to Ocean Pollution" type="main" />
    <QuoteHighlight quoteText="According to scientific studies on marine pollution, roughly 0.5% of plastic waste ends up in the ocean."/>
    <Textbox content={content1} />
    <img src="/lessons/41.jpg" />
    <Textbox content={content2} />
    <StickyButton />
  </div>
  );
}

export default Course6Introduction
