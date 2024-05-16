'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['These can include plants and animals, vegetation, climate, and more. Naturally, when any one of these elements is changed, the surrounding ecosystem changes as a result. Over time, significant changes to an ecosystem can cause it to become endangered - meaning that they are at risk of collapsing.'],
  ['<title>Human Impact on Ecosystems</title>'],
  ['Events like natural disasters can have a strong effect on an ecosystem, but it is persistent, systemic intervention influenced by human development that poses the greatest long-term risk to established ecosystems. For example, logging operations can drastically reduce habitat used by animals like birds, pollute soil, and reduce the planet’s ability to capture carbon dioxide.'],
  ['Deforestation is far from the only thing that can cause an ecosystem to become endangered. Other human activities like agriculture (one of the leading causes of deforestation), overfishing, and the extraction of fossil fuels like petroleum and coal also have potentially severe consequences for the ecosystems where they take place. We’ll take a closer look at the primary causes of ecosystem endangerment in the next lessons, but for now we’ll seek to understand the significance of <green>ecosystem conservation and restoration.</green>'],
];

const content2 = [
  ['<title>Ecosystem Conservation & Restoration</title>'],
  ['<green>Ecosystem conservation</green> refers to the act of changing our behaviors and activities as humans to reduce their impact on the environment. The goal is to prevent further damage to an ecosystem. In contrast, <green>ecosystem restoration</green> refers to the process of revitalizing already-damaged or endangered ecosystems through activities like tree planting, invasive species eradication, reintroduction of native species, and more. In most cases, conservation and restoration go hand-in-hand when seeking to rehabilitate an ecosystem that has already been destabilized by human activities.'],
  ['While individual ecosystems can become endangered, it’s important to remember that they are also components in the interconnected ecosystem that is the Earth. Because of this, changes in an ecosystem in one part of the world can have far-reaching effects all around the globe.'],
];

function Course3Introduction() {
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
      <LessonNumber lessonText="Introduction" />
      <TitleHeader title="Introduction to Endangered Ecosystems" type="main" />
      <QuoteHighlight quoteText="Ecosystems are formed by a delicate balance of many different natural forces." />
      <Textbox content={content1} />
      <img src="/lessons/22.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Next" callback={() => { console.log('Go to lesson 1'); }} />
    </div>
  );
}

export default Course3Introduction;
