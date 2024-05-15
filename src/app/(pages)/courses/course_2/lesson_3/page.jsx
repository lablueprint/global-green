import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import TextImageLeft from '@/app/components/TextImageLeft';


const content1 = [
  ["Thanks to our friends at the Precious Plastic Academy, a variety of machines and tools are purchasable by small businesses and individuals. Or, if you’re handy enough, you can even build them yourself! These machines each fill a specific need within the plastic remanufacturing process, and through skilled use the budding plasticsmith or sustainability lab can create all kinds of goods from plastic debris."]
]

const content2 = [
    {
      image: '/lessons/Shredder.jpg',
      text: [
        ["<title>Shredder</title>"],
        ["The pressure is on when you need to make larger, more intricate objects that aren’t easily produced with the injector. The compressor adds an oven and hydraulic press to the equation and allows the plasticsmith to fill larger molds that require the addition of large amounts of pressure. With this, you can make simple objects like bricks and tiles, or more ornate ones like ornate bowls."]
      ],
    },
]

const content3 = [
  {
    image: '/lessons/Extruder.jpg',
    text: [
      ["<title>Extruder</title>"],
      ["The extruder is where things really start cooking. It heats and presses plastic, then extrudes it in an unbroken string. This material can be used as 3D printer filament and for a variety of other uses."]
    ],
  },
]

const content4 = [
  {
    image: '/lessons/Injector.jpg',
    text: [
      ["<title>Injector</title>"],
      ["The injection machine allows the plasticsmith to easily fill a variety of different molds. Plastic shreds are inserted and heated, then the melted plastic can be injected directly into the mold for anything from kitchenware to phone cases. Can you think of anything you’d make a mold of?"]
    ],
  },
]

const content5 = [
  {
    image: '/lessons/Compressor.jpg',
    text: [
      ["<title>Compressor</title>"],
      ["The pressure is on when you need to make larger, more intricate objects that aren’t easily produced with the injector. The compressor adds an oven and hydraulic press to the equation and allows the plasticsmith to fill larger molds that require the addition of large amounts of pressure. With this, you can make simple objects like bricks and tiles, or more ornate ones like ornate bowls."]
    ],
  },
]

const content6 = [
  ["With these tools, businesses and individual plasticsmiths have already figured out how to make some truly impressive items and goods. Not only can you keep plastic debris out of oceans and landfills, but you can turn that waste into something you need, or even make it a form of artistic expression. Pretty nifty, isn’t it?"]
]

function Course2Lesson3() {
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
      <LessonNumber lessonText="Lesson 3"/>
      <TitleHeader title="Meet the Machines with Precious Plastic" type="main" />
      <img src="/lessons/1.png"/>
      <QuoteHighlight quoteText="Now that we know what a plasticsmith does, let’s take a quick look at the marvelous machines that make it all possible."/>
      <Textbox content={content1} />
      <TitleHeader title="Precious Plastic Machines" type="sub" />
      <TextImageLeft contentArray = {content2}/>
      <TextImageLeft contentArray = {content3}/>
      <TextImageLeft contentArray = {content4}/>
      <TextImageLeft contentArray = {content5}/>
      <Textbox content={content6} />
      <StickyButton />
  </div>
  );
}

export default Course2Lesson3
