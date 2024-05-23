'use client';

import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';
import Textbox from '@/app/components/Textbox';
import styles from '../../page.module.css';

const content1 = [
  [
    'Is it light or heavy? Transparent or opaque? Flexible or rigid? Depending on which characteristics you note, it could be one of many different types of plastic.',
  ],
  [
    'The plastic used in a common water bottle is different from that used in PVC pipes, shampoo bottles, and shopping bags. While we refer to each of these common items as plastic, the truth is that <green>there are many different types of plastics that are tailored towards different use cases.</green>',
  ],
  [
    '<title>Plastic Identification</title>',
  ],
  [
    'Plastic is a synthetic material made from organic polymers, which means that it is created by taking natural resources, such as natural gas and oil, and processing them into workable materials. These natural resources can be processed in different ways to create products with varying properties, placing them on a spectrum of weight, durability, transparency, and so on.',
  ],
  [
    'So how do you distinguish between the different types of plastic you may come across? It’s actually pretty simple—take that plastic item you found and flip it upside down. Chances are you’ll see a number with chasing arrows around it, looking something like this:',
  ],
  [
    '<greenCenterText>♳</greenCenterText>',
  ],
  [
    'This symbol is often referred to as a recycling number, but the technical term for it is a Resin Identification Code (RIC). These codes help consumers identify what type of plastic the material is made from and assist consumers and recycling centers with sorting different types of plastics.',
  ],
];

const content2 = [
  ['<title>The Seven Plastics (7 RICS)</title>'],
  ['Depending on the item, you may find one of 7 RICs on a piece of plastic. Each number refers to a different plastic. These 7 plastics are as follows:'],
  ['<greenCenterText>♳ Polyethylene terephthalate (PET)</greenCenterText>'],
  ['<greenCenterText>♴ High-density polyethylene (HDPE)</greenCenterText>'],
  ['<greenCenterText>♵ Polyvinyl chloride (PVC)</greenCenterText>'],
  ['<greenCenterText>♶ Low-density polyethylene (LDPE)</greenCenterText>'],
  ['<greenCenterText>♷ Polypropylene (PP)</greenCenterText>'],
  ['<greenCenterText>♸ Polystyrene (PS)</greenCenterText>'],
  ['<greenCenterText>♹ Mixed plastics</greenCenterText>'],
];

const content3 = [
  ['Note that RICs 1-6 each refer to a specific type of plastic, whereas RIC 7 is less precise. RIC 7 plastic may contain various different mixtures of other plastics, which means that it is the least likely type of plastic to be recycled. So what about 1-6? What are their different properties, and what are they used for?'],
  ['First off, the most common RIC you’ll find is, unsurprisingly, number 1: <green>Polyethylene terephthalate</green>, commonly abbreviated as PET (or PETE). This is the plastic you’ll find used to make drink containers like water and soda bottles, as well as other food containers like tubs of peanut butter and salad dressings. <green>In fact, over 75% of plastic water bottles in the U.S. are made from PET plastic.</green>'],
  ['Refer to the table below for the names, abbreviations, and common applications of RICs 1-6:'],
];

const content4 = [
  ['By labeling each of these different types of plastic with RICs, consumers can refer to their local recycling regulations to see what items can and cannot be recycled in their area. While rules and regulations vary from state to state, and even county to county, <green>♳ PET and ♴ HDPE plastics are by far the most commonly recycled plastics throughout the U.S.</green>'],
  ['<title>Repurposing of Plastics</title>'],
  ['Once these items have been collected and properly sorted at recycling centers, they can be sold to manufacturers for reuse. What plastics are purchased and how they are repurposed will vary depending on who buys it. For example, some manufacturers may purchase only PET plastics, and each manufacturer may use the purchased materials for different purposes.'],
  ['Sometimes these plastics can be recycled for their original use, whereas other times these materials are repurposed into various other forms, <green>ranging anywhere from fibers for carpets to reusable bags, shoes, and packing materials.</green>'],
  ['So to recap: The 7 different numbers found on consumer plastics are known as Resin Identification Codes, and each code refers to a different type of plastic. Each of these plastics (polymers) have different characteristics that make them suitable for various uses, ranging from packaging food to construction materials.'],
  ['By consulting local recycling guidelines, consumers can identify which of their household plastics can be recycled. Proper recycling on the consumer level helps to expedite the sorting process and reduce plastic waste. Once plastics have been collected and sorted, they are sold to manufacturers to be repurposed into a variety of products.'],
];

function Course1Lesson2({ handleNext }) {
  return (
    <div className={styles['lesson-container']}>
      <LessonNumber lessonText="Lesson 2" />
      <TitleHeader title="Resin Identification Codes" type="main" />
      <img src="/lessons/1.png" />
      <QuoteHighlight quoteText="Quick! Take a look around you and find the nearest plastic item. What do you notice about it?" />
      <Textbox content={content1} />
      <GreyBoxHighlight content={content2} />
      <Textbox content={content3} />
      <img src="/lessons/PolymerChart.png" />
      <Textbox content={content4} />
      <StickyButton text="Go to quiz" callback={handleNext} />
    </div>
  );
}

export default Course1Lesson2;
