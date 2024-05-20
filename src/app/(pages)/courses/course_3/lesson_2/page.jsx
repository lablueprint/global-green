'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['<title>Caribbean Coral Reefs</title>'],
  ['Coral reefs create an essential habitat for life underwater and on land. Beyond being a vital economic resource and foodsource, they play a vital role in protecting coastlines from storms and erosion. Coral reefs are under serious threat for a variety of factors, including pollution, rising ocean temperatures resulting in acidification, overfishing, and more. As the coral ecosystem becomes stressed, it begins to bleach and die away. These ecosystems are able to recover if left alone, but this process can take years.'],
];

const content2 = [
  ['<title>Amazon River Basin</title>'],
  ["The Amazon River basin is a vast, biodiverse region spanning 7.4 million square kilometers across South America, encompassing various ecosystems like rainforests, rivers, and diverse wildlife. It's home to countless species and plays a crucial role in global climate regulation. Due to its expansive bounties of natural resources and fertile land, the land has become increasingly developed for agriculture and other industries."],
  ['Logging, mining, and infrastructure development all play a role in the destruction of this natural habitat. This destruction of habitat leads to a decline in biodiversity, or variety of species, within the ecosystem. Additionally, declines in forest land further impair the ecosystem’s ability to capture carbon dioxide and heat, which both contribute to rising global temperatures.'],
];

const content3 = [
  ['<title>Yellow Sea Tidal Flats</title>'],
  ['The Yellow Sea, situated east of China, has been losing its tidal flats (a form of coastal wetland) at an alarming pace: 28% of the ecosystem has disappeared over the last 3 decades. For humans, the tidal flats are a substantial source of food, but they serve important ecological functions as well. Like coral reefs, tidal flats provide habitat for organisms like fish and shellfish while also serving as a resting ground for migratory birds. Like many coastal ecosystems, they also protect coastal populations from meteorological events like storm surges and flooding. According to a NASA report, “the rapid loss is attributed to extensive land reclamation projects for urban, industrial, and aqua- and agriculture, but loss of sedimentation and ground subsidence are also contributing factors.'],
];
const content4 = [
  ['<title>Alaskan Kelp Forest</title>'],
  ['Kelp forests are an aquatic ecosystem consisting of large swathes of brown algae. This ecosystem provides food and shelter for large populations of marine species like fish, dolphins, and invertebrates. However, over the last 10 years the sea urchin population has boomed thanks to a decline in predator species, namely the sunflower sea star. Without a natural predator to cull urchin populations, they have managed to explode in numbers, and the brown algae that comprises the kelp forest is one of their primary nutrient sources. As a result, brown algae has been rapidly declining, posing an existential risk to kelp forests.'],
];

function Course3Lesson2() {
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
      <LessonNumber lessonText="Lesson 2" />
      <TitleHeader title="Endangered Ecosystems Around the World" type="main" />
      <QuoteHighlight quoteText="Let’s take a look at some of the endangered ecosystems around the world:" />
      <Textbox content={content1} />
      <img src="/lessons/24.jpg" />
      <Textbox content={content2} />
      <img src="/lessons/25.jpg" />
      <Textbox content={content3} />
      <img src="/lessons/26.jpg" />
      <Textbox content={content4} />
      <img src="/lessons/27.jpg" />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 2'); }} />
    </div>
  );
}

export default Course3Lesson2;
