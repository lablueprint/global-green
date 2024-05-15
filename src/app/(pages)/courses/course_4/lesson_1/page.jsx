import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ["When an ecosystem is healthy and thriving, every one of its member species contributes to the flow of energy and nutrients within the ecosystem simply by behaving in the way they have evolved to over the course of millions of years. However, as the global climate changes, life must begin to adapt and change to the new world that is being formed. Because life on Earth has evolved over millions of years to be suited to specific climatic conditions, such as particular levels of heat, it adapts at a much slower pace than our human activities are changing it. As a result, this rapid change in the global climate poses major challenges to all forms of life."],
  ["<title>Climate Change Impact on an Ecosystem</title>"],
  ["Climate change has destabilized many ecosystems that depend on a particular balance of light, heat, rainfall, and other factors. As we have discussed in other lessons, changing one element of an ecosystem causes sometimes unexpected changes. For example, the vegetation within an ecosystem may be uniquely adapted to specific levels of heat and rainfall. When they are subjected to more heat or rain than they have adapted to handle, their populations can begin to decline. Over time, an inability to adapt to the newly introduced pressures of a changing climate can cause forms of life to no longer be well-suited to their environments. If they cannot continue to fill their niche, they risk becoming extinct."],
  ["These effects extend to every ecosystem, both terrestrial and aquatic. Warming oceans threaten marine biodiversity in a number of ways. For instance, coral reefs are particularly vulnerable. Rising sea temperatures cause coral bleaching, resulting in the loss of vibrant colors and the weakening of coral structures. This slowly weakens the coral reefs’ ability to survive and continue to provide vital habitat to marine species. Without this habitat, these organisms face many new threats that they are not equipped to handle."]
]

const content2 = [
  ["<title>Mass Extinction</title>"],
  ["Due to the rapidly changing climate, we have entered a period of mass extinction. Mass extinction events have occurred throughout Earth’s history due to a number of factors, but it is undeniable that the present one is driven primarily by human activities. The loss of species diminishes the planet's biodiversity and weakens its ability to adapt to changing conditions."],
  ["In conclusion, climate change is a major threat to global biodiversity. As stewards of the planet, we are tasked with preserving this biodiversity not only for its intrinsic value but also for the invaluable services it provides to humanity."]
]

function Course4Lesson1() {
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
    <LessonNumber lessonText="Lesson 1"/>
    <TitleHeader title="Impact on Biodiversity" type="main" />
    <QuoteHighlight quoteText="Every organism in an ecosystem has a niche."/>
    <Textbox content={content1} />
    <img src="/lessons/30.jpg"/>
    <Textbox content={content2} />
    <StickyButton />
  </div>
  );
}

export default Course4Lesson1
