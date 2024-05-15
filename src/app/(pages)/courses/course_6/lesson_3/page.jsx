import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ["Because the Earth is a ‘blue’ planet—meaning that the vast majority of the planet is covered by oceans—they form the foundation of the global climate. Unsurprisingly, then, climate change is both caused and affects the oceans in numerous ways."],
  ["<title>Ocean Acidification</title>"],
  ["One of the major ways that anthropogenic climate change has been interacting with our marine ecosystems is <green>ocean acidification</green>, which is the gradual reduction in the ocean’s pH since the beginning of the industrial revolution. But what does this mean in practical terms, and what causes it?"],
  ["As we’ve established in previous lessons, human activities have caused a massive increase in the amount of greenhouse gasses, most notably CO2, in the Earth’s atmosphere. Those greenhouse gasses do not simply float intently in the atmosphere, however; much of it is absorbed by the ocean. Estimates place the amount of CO2 absorbed from the atmosphere by the ocean at around 30%. When the ocean absorbs this increased quantity of CO2, it can begin to cause major changes in the ocean’s chemical composition, which in turn disrupts marine ecosystems in a variety of ways."],
  ["<title>Calcification Disruption</title>"],
  ["Firstly, the acidification of the ocean disrupts the calcification processes of marine species such as oysters and corals, though many more species are also affected by this. Many of the species most affected by the acidification of the ocean play vital roles within ecosystems. Corals provide vital habitat and are historically among the most biodiverse places on the planet, and oysters play a key role in ocean health by filtering and cleaning the water. Additionally, both of these ecosystems provide protection against erosions and storms. Because of this, a threat to coral and oyster reefs can have far-reaching effects on the health and stability of marine ecosystems as a whole."],
  ["<title>Impact of Acidification on Non-Calcifying Species</title>"],
  ["Ocean acidification also directly threatens non-calcifying species. Plankton, which form the foundation of many marine ecosystems’ food web, respond in varying ways to increased ocean acidification. For some species, this change in environment can cause a dramatic reduction in the health and growth of plankton. Additionally, the increased acidity of oceans disrupts the survivability of species such as clownfish. It is difficult to know the full extent of how this change in the ocean’s pH will affect biodiversity. Some studies suggest that the increase in acidity may actually enable the growth of species of algae, but our understanding of how these changes will affect Earth’s interconnected marine ecosystems is far from complete."]
]


function Course6Lesson3() {
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
    <TitleHeader title="Ocean Acidification" type="main" />
    <QuoteHighlight quoteText="Pollutants like plastics and chemicals are not the only threat posed to our oceans today."/>
    <Textbox content={content1} />
    <StickyButton />
  </div>
  );
}

export default Course6Lesson3
