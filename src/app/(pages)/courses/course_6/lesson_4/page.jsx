import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ["As always, it’s worth noting that the first and best measures we can take against ocean pollution is stopping it at the source. Naturally, the fewer pollutants and chemicals we use and rely on, the less they will find their way into our oceans. At this point, however, a huge amount of pollution already exists in marine ecosystems, so the next best thing we can do is find new and innovative ways to clean them up. Below, we’ll look at two different approaches that we’ll need to use synergistically to put a dent in the environmental risks of various forms of pollution."],
  ["<title>Waste Reduction</title>"],
  ["There are many potential solutions to be explored for how we can reduce our dependence on toxic materials and chemicals. By far one of the biggest changes we can make is moving away from plastics, especially single-use plastics such as water bottles and straws. The best means of reducing our dependence on single use plastics is twofold: place prohibitions against the use of plastic for certain types of items, and fund the development of sustainable alternatives. There have been many innovations and pushes for biodegradable, eco-friendly alternatives to plastic products in recent years. Materials like bamboo and mycelium from mushrooms can be used to produce items like disposable food containers, tableware, and packaging materials. Shifting away from using single-use plastics as more sustainable materials are developed and become available will play an important role in reducing the amount of plastic released into oceans. And, of course, recycle as much as possible when plastic alternatives aren’t available!"],
  ["<title>Waste Cleanup</title>"],
  ["Even if we completely stopped using plastic today, there would still be tons and tons of it left in our oceans and waterways. So that begs the question: what is being done to clean up all that plastic? The traditional approach is pretty straightforward: extraction vessels can drag large nets as if they were fishing for plastic. Many efforts also focus on intercepting plastic in rivers before it reaches the ocean. In recent years, however, pushes for more advanced technologies to tackle the problem have been made. Some companies have piloted technologies that can passively collect floating plastics through a variety of mechanisms such as harnessing ocean currents. To date, however, no fool-proof means of dealing with the staggering amounts of plastic in our oceans has been developed. Innovating in this area will play a major role in addressing the ocean plastic crisis in the years to come!"],
]


function Course6Lesson4() {
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
    <TitleHeader title="Innovative Solutions" type="main" />
    <QuoteHighlight quoteText="Now that we’ve established the many threats that various types of pollution pose to our ecosystems, it’s time to look into what is being done to address them!"/>
    <Textbox content={content1} />
    <img src="/lessons/44.jpg" />
    <StickyButton />
  </div>
  );
}

export default Course6Lesson4
