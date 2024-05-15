import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ["The vast majority of marine pollution comes in the form of plastic, and it is by far the hardest form of pollution for ecosystems to recover from. That’s because, for all intents and purposes, plastic remains in solid form within marine ecosystems more or less permanently. Estimates of how long plastic takes to break down (500+ years) means that practically every piece of  plastic that has ever been produced still exists somewhere in the world."],
  ["<title>Permanent Pollutants</title>"],
  ["But what dangers do these permanent pollutants pose to our ecosystems? Here are just a few:"]
]

const content2 = [
  ["• <green>Injures and kills various species, not just fish: </green>Affected species include a variety of animals (including fish, mammals, seabirds, and sea turtles). Importantly, consuming this plastic is not the only way that marine species can be harmed by it. Plastic can also cause suffocation, starvation, infection, and entanglement among other forms of harm."],
  ["• <green>Increases ocean toxicity: </green>As plastic breaks down (very, very slowly), it also releases toxins into ecosystems. Many of these toxins are used in plastic production to make plastic more durable or colorful. Because plastics seep chemicals into the environment, the Ocean Conservancy states that plastic pollution is chemical pollution."],
  ["• <green>Plastic forms garbage patches: </green>Approximately half of plastic pollution in the oceans sinks to the sea floor. The remaining plastics, which are buoyant enough to remain at the surface, are gathered into huge patches by ocean currents. These patches create islands of concentrated toxicity and danger to marine species. In addition to this, these patches block sunlight from reaching below the surface, which has a negative effect on life such as plankton and algae. These garbage patches are a mixture of larger objects and microplastics."],
  ["• <green>Ocean pollution hurts us, too: </green>Inevitably, when marine species that humans consume plastics and microplastics, the same toxins that infect their bodies goes on to enter human foodsystems. In effect, we are not only polluting oceans and hurting animals; we’re polluting our own bodies, too."]
]

const content3 = [
  ["<title>Our Future Oceans</title>"],
  ["The harms of plastic pollution in the ocean don’t end there. It is estimated that plastic pollution will likely outweigh all fish species by 2050. Think about that: we are slowly transforming our precious ecosystems, which have been inhabited by massively biodiverse populations of various forms of wildlife for millions of years, into a domain primarily inhabited by plastic. That’s why it is essential that we take quick, decisive action against plastic pollution and begin finding a means of clearing away the trillions and trillions of pieces of plastic floating around our oceans."]
]

function Course6Lesson1() {
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
    <TitleHeader title="Plastic Pollutions in Our Oceans" type="main" />
    <QuoteHighlight quoteText="In terms of pollutants, by far the most pressing threat to our oceans is plastic."/>
    <Textbox content={content1} />
    <GreyBoxHighlight content={content2} />
    <Textbox content={content3} />
    <img src="/lessons/42.jpg"/>
    <StickyButton />
  </div>
  );
}

export default Course6Lesson1
