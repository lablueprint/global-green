'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ['There are countless cities around the world with amazing sights and marvels to enjoy, but relishing the beauty and abundance of nature around the world is an equally valid reason to travel. <green>Eco-tourism</green> is the practice of traveling sustainably for the purpose of immersing yourself in nature and to see Earth’s numerous natural wonders. Whether that means taking a dive in Australia’s Great Barrier Reef or touring the majestic waterfalls of Costa Rica, it’s important to take a moment and consider how you can make your trip as eco-friendly and sustainable as possible.'],
  ['<title>Unintended Effects of Ecotourism</title>'],
  ['Eco-tourism poses a bit of a conundrum, however: visitors want to witness nature’s beauty, but the very act of being a tourist and traveling the world can have many unforeseen consequences. To begin with, the act of traveling, especially by car or plane, inherently emits greenhouse gasses that contribute to climate change. But that’s only the beginning of the journey; tourists can cause unintended harm to ecosystems simply by visiting them, and this is especially true in areas that experience over-tourism.'],
  ['<title>Traveling Sustainably</title>'],
  ['In the modern age, social media has the potential to cause spikes in tourism to locations around the world, and ecosystems are not always equipped to handle this sudden influx in visitors. That’s why it’s vital that tourists research and understand the conditions of their destinations before setting out. <green>Traveling sustainably means limiting your impact on the environment to ensure that others have the opportunity to visit, too.</green> This isn’t always a simple task, however; even hiking on a forest trail comes with potentially harmful effects. Areas that experience over-tourism, such as Machu Picchu, have seen a literal and figurative erosion of the natural environment as more and more visitors flock to them. While it isn’t always apparent when you’re there, every step through nature leaves a footprint, and over years millions of these footprints can add up to become ecological issues.'],
];

const content2 = [
  ['<title>‘Leave No Trace’ Tourism</title>'],
  ['Thankfully, there are many steps that are easy to implement that can help you ensure that you’re doing your part to prevent more severe harm to ecosystems. A good model to follow is to practice the ‘leave no trace’ tourism method:'],
];

const content3 = [
  ['• Never, <green>ever</green> leave garbage or other forms of waste, especially plastic waste, in a natural environment. Items like plastic bags and wrappers can pollute an ecosystem for decades.'],
  ['• Do not vandalize or leave marks on the environment. This includes writing, engraving, or even moving parts of the natural words (such as rocks) around.'],
  ['• Always bring a reusable water bottle! This goes for reusable cutlery, dishes, and other similar items.'],
  ['• Do not interfere with wildlife. Observe them from a distance, and don’t feed wild animals.'],
  ['• Book experiences with local tourism offices. In addition to helping sustain the local economy, many local tourism offices are also directly invested in employing sustainable practices.'],
  ['• Use public transit to get to and from your destination.'],
  ['• Always respect established paths, boundaries, and guidelines for visiting that particular environment.'],
];

const content4 = [
  ['While it can be tempting to visit that viral destination you saw on social media, consider charting your own path and discovering opportunities that receive less tourism. In addition to not contributing to issues of over-tourism, this is a great way to see and experience something new and exciting. The world is vast and full of wonders to see!'],
];

function Course5Lesson3() {
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
      <TitleHeader title="Eco-Tourism Examined" type="main" />
      <QuoteHighlight quoteText="When you think of tourism, you might envision snapping photos atop the Eiffel Tower or taking the railway up Rio de Janeiro’s Corcovado mountain to see Cristo Redentor up-close." />
      <Textbox content={content1} />
      <img src="/lessons/39.jpg" />
      <Textbox content={content2} />
      <GreyBoxHighlight content={content3} />
      <Textbox content={content4} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 3'); }} />
    </div>
  );
}

export default Course5Lesson3;
