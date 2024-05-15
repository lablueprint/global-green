import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ["Because every ecosystem is unique, there is no one-size-fits-all solution to tackling these issues. That’s why the first step you should take is to get informed on environmental issues in your area! Great places to seek out guidance are from your local municipality and environmental organizations."],
  ["<title>Taking Action</title>"],
  ["As discussed in other courses, following the Three Rs of reduce, reuse, and recycle is also a great way to limit your impact on the environment. By being attuned with how your consumer choices impact the environment, you can make informed decisions that help to limit your footprint. Here are some good starting points for limiting your impact:"]
]

const content2 = [
  ["• Limit waste by using fewer disposable / single use items."],
  ["• Conserve energy by using energy-efficient products such as LED light bulbs and keeping products and appliances off when not in use."],
  ["• Be mindful of how much water you use on a daily basis."],
  ["• Do not dispose of potentially harmful chemicals via drains where they can end up in waterways."],
]

const content3 = [
  ["Of course, you can always take a more proactive approach as well. Below are some ways that you can make a positive impact on your environment:"]
]

const content4 = [
  ["• Familiarize yourself with local organizations that have formed to address environmental issues, as they will often have extensive volunteer opportunities. These could range from tree plantings to helping cull invasive plant species from an area and much more. Not only is this a great way to help preserve and restore the world around you, but it’s a great way to meet like minded environmentalists too!"],
  ["• Help beautify local green spaces by picking up litter! Every piece of trash left in the environment can be a hazard to wildlife or potentially toxic to plants."],
  ["• Plant and care for native crops. There is a growing movement among homeowners to convert traditional grass lawns into havens for native species, which helps local ecosystems flourish while requiring less water than traditional grass lawns."],
]




function Course3Lesson4() {
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
    <TitleHeader title="What You Can Do" type="main" />
    <QuoteHighlight quoteText="So now that we understand the causes and effects of endangered ecosystems, it’s time to learn what we can do to help!"/>
    <Textbox content={content1} />

    <img src='/lessons/28.jpg' />
    <GreyBoxHighlight content={content2} />
    <Textbox content = {content3} />
    <GreyBoxHighlight content={content4} />
    <StickyButton />
  </div>
  );
}

export default Course3Lesson4
