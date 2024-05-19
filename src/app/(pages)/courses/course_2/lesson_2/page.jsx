'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';
import Dropdown from '@/app/components/Dropdown';

const content1 = [
  ['In the distant past we’ve gone through a stone age and a bronze age, and now many have argued that we are in the middle of a wholly new era: the plastic age.'],
];

const content2 = [
  ['<title>Plasticsmiths</title>'],
  ['Whereas craftspeople in previous ages were individuals, plastic production has depended almost exclusively on machinery and industrial processes. That doesn’t have to be the case, however. At the Sustainability Lab, we have the plastic-age equivalent of the blacksmith, or what we like to call a plasticsmith. These are craftspeople who are skilled at working  with different types of plastic to create an astonishing array of items and goods.'],
  ['Becoming a plasticsmith means familiarizing oneself with the tools of the trade—like shredders to break down existing pieces of unwanted plastic—and reworking plastic to suit a wide range of needs. Plastic is already a durable and versatile material, and reusing it in this way helps cut down on the pollution that enters our ecosystems and waterways. Whereas the production of items like single-use water bottles and other disposables betrays the material’s strengths for convenience, reworking plastic lets the Sustainability Lab’s plasticsmith give plastic life beyond its original function.'],
]

const content3 = [
  ['<title>Plasticsmiths in Action</title>'],
  ['So what exactly does it look like to be a Sustainability Lab plasticsmith? Here’s how one plasticsmith who works in a Sustainability Lab, Rasheed, might go about making a simple plastic brick:'],
];

const content4 = [
  ['1. Rasheed decides he wants to make a brick out of the plastic he has the greatest quantity of: PETE.'],
  ['2. Rasheed gathers as many pieces of PETE plastic as he can find and makes sure there is no residue left on any of the pieces. Rasheed cuts up larger pieces of plastic to make processing them easier.'],
  ['3. Rasheed feeds the pieces of PETE plastic into the shredder, which breaks it into small flakes and pellets.'],
  ['4. Now that Rasheed has his plastic flakes, he needs a mold to fill them with. He finds an appropriate brick mold and fills it with his plastic flakes.'],
  ['5. Now Rasheed is ready to insert his mold filled with plastic flakes into the compression machine. He sets the temperature according to the plastic he’s using and waits for it to melt before lowering the press to get everything in shape.'],
  ['6. Once this process has completed and the compression machine and plastic have had time to cool off, Rasheed can remove the filled mold from the compression machine. And voila! Just like that, Rasheed has made a sturdy, colorful brick entirely from recycled plastic.'],
]

const content5 = [
  ['Of course, a plasticsmith can make much more than bricks. A variety of different types of molds may be used to create a huge variety of objects. Consider if there’s anything you’d like to build! If it can be fit into a mold, then you can create it from recycled plastic. But it’s okay if that all sounds a little technical and complicated. Like with other crafts, learning to build and create with plastic is a skill and art. If you have something you’d like to have made in this way, try seeing if there are any friendly neighborhood plasticsmiths where you live! There might just be a Sustainability Lab near you soon.'],
];
function Course2Lesson2() {
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
      <TitleHeader title="Becoming a Plasticsmith at the Sustainability Lab" type="main" />
      <QuoteHighlight quoteText="Be it a blacksmith forging a sword or a carpenter building a table, humans have been crafting tools and items for thousands of years." />
      <Textbox content={content1} />
      <img src="/lessons/14.jpg" />
      <Textbox content={content2} />
      <img src="/lessons/15.jpg" />
      <Textbox content={content3} />
      <GreyBoxHighlight content={content4} />
      <img src="/lessons/16.jpg" />
      <Textbox content={content5} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 2'); }} />
    </div>
  );
}

export default Course2Lesson2;
