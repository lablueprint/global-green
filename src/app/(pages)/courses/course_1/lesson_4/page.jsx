'use client';

import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['Because one of the primary purposes of plastic production is for use in consumer goods, it is individuals and communities like us who are faced with the challenge of responsibly recycling and managing our plastic.'],
  ['<title>The Three R’s</title>'],
  ['It is often said there are three R’s that consumers should remember to mitigate their plastic footprint:'],
  ['<green>R</green>educe'],
  ['<green>R</green>euse'],
  ['<green>R</green>ecycle'],
  ['<title>Reduce</title>'],
  ['These three R’s are listed in order of their environmental impact. The best way to keep plastic from making its way into our ecosystems, shedding microplastics into the atmosphere, and seeping toxins into waterways is simply to reduce the amount of plastic goods and products, especially single-use plastics, you use as an individual. We’ll get into the second R soon, but for now let’s take a look at recycling.'],
  ['<title>Knowing Your Local Recycling Rules</title>'],
  ['There is no federal recycling guideline, which means that rules about what is and isn’t accepted vary widely. For example, some localities may accept ♵ PVC, whereas other will only accept ♳ PET and ♴ HDPE. Knowing what plastics your collection program accepts prevents you from accidentally mixing in items that cannot be recycled. This is important because poorly sorted recycling is often sent to a landfill rather than being repurposed as intended. This information can commonly be found on your local recycling office’s website.'],
  ['<title>Improper Recycling</title>'],
  ['In many cases, recyclable plastics may still be sent to a landfill or otherwise disposed of if they are not properly cleaned before recycling. Plastic cannot be recycled if it has too much contamination from food residue, as this could render the resulting plastic too impure for reuse. Rather than risk damaging equipment or contaminating the plastic, most recyclers will dispose of the items. It’s a little extra work to ensure that all your recyclables are properly washed, but it could be the difference between your recyclables being repurposed and ending up in landfill.'],
  ['<title>Reuse</title>'],
  ['Dropping your clean recyclables into a bin for weekly pickup is a great way to help limit plastic pollution, but there are hundreds of other ways to recycle, too! That’s where the second R, Reuse, comes in. The same qualities that make plastic useful in consumer goods can also make them useful in a variety of other applications. Reusing materials like plastic for various household purposes is a great way to limit the amount of plastic waste you produce as an individual. You can find hundreds of ways to <green>upcycle and downcycle</green> — transform plastic waste into new items — online. Ideas include repurposing plastic bottles as small planters or bird feeders. Check out some other fun ways you can extend the life cycle of your plastic goods!'],
  ['Recycling doesn’t have to be a solitary effort, either. Beyond individual efforts, you can support initiatives that promote recycling and reduction of plastic waste, participate in community clean-ups, and volunteer for local recycling programs. Advocating for better recycling infrastructure and educating others about the importance of responsible plastic disposal are great ways to make an individual contribution to our collective recycling efforts.'],
];

function Course1Lesson4() {
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
      <LessonNumber lessonText="Lesson 4" />
      <TitleHeader title="Recycling Responsibly" type="main" />
      <img src="/lessons/5.png" />
      <QuoteHighlight quoteText="Now that we understand the severity of plastic pollution’s effects on
      our environment, we can discuss one of the best ways that we as individuals can help to mitigate
      these issues: recycling!"
      />
      <Textbox content={content1} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 4'); }} />
    </div>
  );
}

export default Course1Lesson4;
