import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ["Despite this, many myths concerning climate change persist. In this lesson, we will address some of these recurrent myths and clarify fact from fiction."],
  ["Promoting climate solutions to people around the world will require us to adapt our communication methods to convey how urgent these issues really are. That’s because climate change is far from a simple process; extensive scientific research was required for us to come to an understanding of how human activities have altered the course of global climate patterns. While the scientific community provides valuable insights into the mechanisms and consequences of climate change, it can be difficult to impress upon people how important urgent climate action truly is."]
]

const content2 = [
  ["<title>Increases in Global Temperature</title>"],
  ["One major concern is that many people do not understand the significance of seemingly minor increases in global temperatures. For example, an average increase of 1 degree C in global temperatures does not mean that it will simply be one degree warmer on any given day. Scientific research indicates that exceeding 1.5 degrees C of warming could trigger multiple climate tipping points. Climate tipping points are “ conditions beyond which changes in a part of the climate system become self-perpetuating.” In simpler terms, this means that a climate tipping point is where it will no longer be feasible to reverse the effects of climate change."],
  ["Passing a climate tipping point could cause irreversible changes within many ecosystems, resulting in totally unidentifiable habitats and conditions. It could mean the total loss of ice in the arctic, or an unstoppable decline in global biodiversity. For this reason, we must understand the significance of seemingly minor variations in global temperatures. The global climate depends on a well-established balance of forces that are likely to be permanently destabilized by a 1.5 degree C increase in global temperatures, and which are almost certain beyond 2 degree C increase."]
]

const content3 = [
  ["<title>Denial & Skepticism</title>"],
  ["Addressing climate change denial and skepticism is also essential. Misinformation hinders progress and slows the rate of implementing necessary changes. Climate change denial is a pernicious and potentially catastrophic trend that could hamper attempts to reverse our current course. Some deniers will suggest that humans have no influence on global climate patterns and that climate has always been variable over the span of centuries and millennia. However, this is only a fraction of the truth. The global climate has changed throughout Earth’s history, but the present rate of change is unprecedented. Extensive scientific study has revealed the many ways that human activity, especially since the industrial revolution, has expedited the rate of climate change."],
  ["Current trends in the global climate are much more similar to an acute and devastating impact on the global climate, like that of a meteor colliding with the Earth or a supervolcano erupting, than the more gradual forms of climate change indicated by skeptics and deniers. The key difference is that gradual change allows time for life to adapt, whereas relatively sudden changes (like what we are currently facing) pose an existential threat to countless forms of life."],
  ["In conclusion, it is imperative that we all play a role in debunking misinformation that downplays the urgency of rapid climate action. Our scientific understanding of human-driven climate change is relatively recent, but the effects have been accumulating for well over a century now, and we do not have unlimited time to implement solutions and reverse our course. Current estimates suggest that we could reach a point of no return much sooner than previously anticipated, so it is essential that we all combat misinformation and climate denialism."]
]

function Course4Lesson4() {
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
    <LessonNumber lessonText="Lesson 4"/>
    <TitleHeader title="Debunking Climate Change Myths" type="main" />
    <QuoteHighlight quoteText="Awareness of the causes and effects of global warming and climate change has been on the rise in recent decades, which has inspired both individuals and nations to mobilize efforts to adapt their behavior before it’s too late."/>
    <Textbox content={content1} />
    <img src='/lessons/34.jpg' />
    <Textbox content={content2} />
    <img src='/lessons/35.jpg' />
    <Textbox content = {content3} />
    <StickyButton />
  </div>
  );
}

export default Course4Lesson4
