'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ['These are species that have existed and evolved within a habitat or ecosystem over a long period of time. In many cases, native species have existed within their respective ecosystems for millions of years.'],
  ['Take, for example, the Redwoods of California, which have existed for millions of years and have become perfectly suited to their ecosystem. In many cases, other species evolved in tandem with the Redwoods and would have a difficult time surviving if these forests were lost. Likewise, the Redwoods would have a difficult time adapting to new environmental pressures introduced by a change in wildlife within the ecosystem.'],
  ['<title>The Impact of Invasive Species</title>'],
  ['When a plant or animal species is introduced to an ecosystem where it has not previously existed, it risks becoming an <green>invasive species</green>. When a new plant, animal, or other type of organism is introduced into an ecosystem that is not equipped to defend against it, the consequences can be catastrophic. It isn’t difficult to find historical examples of this happening:'],
];

const content2 = [
  ['• In the Great Smoky Mountains, hemlock forests have been devastated by the Hemlock wooly adelgid, an invasive insect species.'],
  ['• Similarly, invasive populations of Lionfish have contributed to the loss of coral reef ecosystems because they eat the herbivores that pick algae off of the reefs; overabundance of algae then begins to slowly strain the reefs.'],
  ['• Noxious weeds can spreadly rampantly through grasslands'],
  ['• All around the country, invasive vine species like English Ivy and Kudzu block native tree and plant species from the sun, starving them of vital nutrients.'],
];

const content3 = [
  ['All of these cases bring with them both direct and secondary harms to the ecosystem. The loss of a coral reef reduces available habitat for marine species, which in turn causes them to dwindle. And when prey species populations decline, the predators who eat them do as well. In this way, every species within an ecosystem is interconnected, and changes to one part of an ecosystem tend to have ramifications throughout it.'],
  ['<title>Causes of Invasive Species</title>'],
  ['So what enables invasive species to, in many cases, so rapidly thrive and push out native populations? The causes are numerous:'],
];

const content4 = [
  ['• In some cases, invasive species are able to move into a new ecosystem easily because all of the predators who would normally hunt them have been removed from it by humans.'],
  ['• In other cases, invasive species are able to thrive because of other damage done to the ecosystem. Once an area of forest has been cut down, it can take decades for the area to regrow. This gives invasive plants a perfect opportunity to dig in their own roots.'],
  ['• Invasive species can sometimes simply outcompete native species due to a particular adaptation (e.g. Kudzu being able to grow on top of existing trees and plants).'],
];

const content5 = [
  ['In most cases, the invasive species was introduced to the ecosystem accidentally through human activities. By far the most common means of introducing invasive species historically has been international commerce and travel. Insects, mammals, and plant seeds often stow away on cargo ships and planes, allowing them to make their way into ecosystems around the world. Whenever they arrive in an ecosystem they are well-suited to, they can thrive and have a rapid surge in their populations. '],
];

function Course3Lesson1() {
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
      <LessonNumber lessonText="Lesson 1" />
      <TitleHeader title="Native and Invasive Species" type="main" />
      <QuoteHighlight quoteText="One of the most severe changes that can occur within an ecosystem is the loss of native species." />
      <Textbox content={content1} />
      <GreyBoxHighlight content={content2} />
      <img src="/lessons/23.jpg" />
      <Textbox content={content3} />
      <GreyBoxHighlight content={content4} />
      <Textbox content={content5} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 1'); }} />
    </div>
  );
}

export default Course3Lesson1;
