'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ['<title>• Use public transit</title>'],
  ['While we covered transportation in the previous section, it’s worth repeating that many destinations are best explored through public transit! In addition to circumventing the complexities of renting a car and learning local traffic laws, public transit is often the quickest and most efficient way to get to a particular destination once you’re in a city. Many cities have extensive subway, bus, and cycling systems that can make getting around less of a chore and more a core part of the journey!'],
  ['<title>• Book eco-friendly accommodations</title>'],
];

const content2 = [
  ['When choosing where to stay, consider looking for hotels or accommodations that use sustainable practices. Many hotels may have certifications or information about their sustainability measures online. Here are some practices that sustainable hotels follow:'],
];

const content3 = [
  ['• No single-use plastics (like disposable shampoo bottles)'],
  ['• Use of renewable energy'],
  ['• Recycling options'],
  ['• Water-efficient toilets and smart showers'],
  ['• Reusable dishware'],
];

const content4 = [
  ['Additionally, it’s worth noting that where you choose to stay can affect local residents. In some places, traditional housing has been converted into accommodations for tourists, which contributes to shortages in many cities. Try to keep this in mind when traveling to a new city. The locals will thank you for it!'],
  ['<title>• Enjoy local cuisine mindfully</title>'],
  ['The joy of food is one of the most appealing reasons to travel. There are so many delicious cuisines in the world to explore, and experiencing local delicacies is a major draw. Whether that means savoring oysters in New Orleans or sushi in Hokkaido, many regional cuisines depend on ingredients grown or harvested from the local area. Look out for restaurants with sustainably grown, locally sourced ingredients. Eating local is a great way to savor new, exciting flavors while supporting local businesses.'],
  ['Without measures to ensure sustainable practices, however, local cuisines and delicacies can be lost. This is especially true of wild-caught seafood, as overfishing poses a major threat to populations of species such as Bluefin Tuna and Grouper. Supporting sustainable farming and fishing practices helps to prevent the loss of local biodiversity.'],
  ['<title>• Pack green</title>'],
  ['Truly sustainable travel starts before you leave home. Packing your suitcase with sustainability in mind allows you to reduce your carbon footprint and reduce pollution. Here are some tips for packing an eco-friendly suitcase:'],
];

const content5 = [
  ['• Don’t forget your reusable water bottle!'],
  ['• Travel light! You don’t need to bring your whole wardrobe with you. Plan ahead so you only bring what you’ll need.'],
  ['• Cut down on waste by packing with reusable items for toiletries.'],
  ['• Use solid soap instead of liquid body washes packaged in plastic.'],
  ['• Make sure your sunscreen is eco-friendly. Chemicals from sunscreen and similar products can have a negative impact on wildlife when it seeps into the environment.'],
  ['• Use e-tickets rather than printed ones.'],
];

const content6 = [
  ['The trick to traveling sustainably is to remember that we should respect and care for the places we visit as we do for our homes. In the end, being an eco-friendly traveler is about expanding the range of your environmental stewardship!'],
];

function Course5Lesson2() {
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
      <TitleHeader title="Reducing Your Carbon Footprint While Traveling" type="main" />
      <QuoteHighlight quoteText="With the big question of how to travel covered, we can now begin looking into additional ways that we can make our journeys environmentally friendly. Check out the tips below!" />
      <Textbox content={content1} />
      <img src="/lessons/40.jpg" />
      <Textbox content={content2} />
      <GreyBoxHighlight content={content3} />
      <Textbox content={content4} />
      <GreyBoxHighlight content={content5} />
      <Textbox content={content6} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 2'); }} />
    </div>
  );
}

export default Course5Lesson2;
