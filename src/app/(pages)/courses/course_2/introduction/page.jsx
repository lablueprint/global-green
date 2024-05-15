import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ["Plastic’s durability is both one of its greatest strengths and what makes it an environmental hazard. The durability and stretchiness of a plastic bag is handy when you’re carrying groceries to your house, but if you then throw that plastic bag away, rather than reusing it, that same durability is what allows wildlife to become entangled in or accidentally eat it. So what can we do?"],
  ["<title>Intro into The Sustainability Lab</title>"],
  ["One solution that has been gaining traction in recent years is to diversify the ways that we reuse plastic. As people have become more aware and concerned about the environmental hazards of plastic pollution, they have developed new technologies and techniques to address these issues. This course and the lessons within will take a closer look at the clever and innovative methods that individuals and organizations have developed to transform their plastic waste into a variety of useful objects. One such technique is Global Green’s Sustainability Lab model."],
  ["What is a Sustainability Lab? Well, we’ll examine this more closely throughout this course, but put simply the Sustainability Lab is a scalable upcycling solution that organizations like Global Green can use to help communities find new uses for their plastic waste. This model takes advantage of machines that are powerful enough to completely rework plastic, but small and affordable enough to be used in a variety of contexts—like at hotels and resorts where large quantities of plastic are often thrown away. By implementing a Sustainability Lab, businesses like these are able to reduce their plastic and carbon footprints and provide a valuable community service that can also become its own revenue stream. Sounds like a win-win, right?"]
];

const content2 = [
  ["<title>Precious Plastic</title>"],
  ["Before we dive into the rest of the course more fully, we recommend also checking out the <green>Precious Plastic Academy</green>, which provides a ton of helpful information and tutorials for topics discussed in the lessons ahead. A special thanks goes out to Precious Plastic Academy for inspiring and guiding us towards using plastic materials more sustainably!"]
];


function Course2Introduction() {
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
      <LessonNumber lessonText="Introduction"/>
      <TitleHeader title="Introduction to Sustainability Labs" type="main" />
      <img src="/lessons/10.png"/>
      <QuoteHighlight quoteText="As we’ve discussed, one of the major dilemmas posed by plastic production and pollution is that it is a highly durable material that is often used for disposable products."/>
      <Textbox content={content1} />
      <img src="/lessons/9.jpg"/>
      <img src="/lessons/11.jpg"/>
      <Textbox content={content2} />
      <img src="/lessons/12.png"/>
      <StickyButton />
    </div>
  );
}

export default Course2Introduction;
