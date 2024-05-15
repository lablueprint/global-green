import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ["Some of the most common sources of other ocean pollutants include chemical/fertilizer runoff from farms, liquid oil deposited on roadways by cars, and other forms of toxic waste that make their way from the land into marine ecosystems, most often via precipitation, the atmosphere, drainage, and similar forces."],
  ["<title>Nonpoint source Pollution (NPSP)</title>"],
  ["These are all examples of <green>nonpoint source pollution (NPSP)</green>, which refers to pollution arising from a broad area rather than from a single discrete source. For example, a drainage pipe pumping waste into an ocean is a discrete and recognizable source of pollution, but oil that runs off from streets into rivers does not have a single identifiable origin."],
  ["<title>Sources of NPSP</title>"],
  ["Most marine pollution, including plastic waste, is actually NPSP. This is not to  say that pollutants aren’t often dumped directly into the ocean, but rather that it is far more common for contaminants to reach the ocean through improper waste management and runoff from other sources. Below are some of the most common sources of NPSP:"]
]

const content2 = [
  ["<green>Agricultural Runoff: </green>Industrial agriculture depends on huge amounts of chemicals to function. Pesticides, herbicides, and fertilizers all have potential benefits for bolstering the efficiency of agricultural production, but in far too many cases these chemicals find their way into nearby rivers and streams that eventually run into the ocean. Once these chemicals reach marine ecosystems, they can throw off the chemical balance in the environment and disrupt natural systems. One major way that agricultural runoff harms marine ecosystems is by causing <green>algal blooms</green>, which are booms in toxic algae growth caused by an increase in ocean temperatures and fertilizers full of nutrients that these algae feed on. These algal blooms reduce the availability of oxygen in marine ecosystems, killing off wildlife in the process."],
  ["<green>Urban Runoff: </green>Similarly to agricultural runoff, many toxic chemicals can reach marine ecosystems via urban runoff. There are a few differences between the two, though. A significant portion of urban runoff comes from point sources (where waste and pollutants are injected directly into marine ecosystems via sewage and drainage systems) rather than nonpoint sources. This is not the only means for urban runoff to reach the ocean, though. Oftentimes pollutants can reach waterways from areas like street surfaces, work sites that use materials toxic to marine ecosystems (such as construction sites), and industrial sites like mines. There is an innumerable amount of different types of chemical pollutants present throughout the urban landscape including but not limited to pet waste, lawn and garden chemicals, automobile emissions, and litter."]
]

const content3 = [
  ["Other types of NPSP such as runoff from mines and improper forestry techniques also pose a threat to marine ecosystems. With all this in mind, what can we do to mitigate the impact of these pollution sources? After all, there’s not much that an individual can do to prevent runoff from industrial agriculture outside of advocating against the use of toxic fertilizers and pesticides. It’s true that systemic change at the level of cities, states, and countries as a whole is essential to making a meaningful difference in the amount of NPSP that makes its way into the ocean."],
  ["<title>How to prevent NPSP</title>"],
  ["Still, mindfulness of how our actions contribute to this systemic issue and committing to sustainable practices are some of the best ways to reduce our individual contribution to this phenomenon. Here are a few helpful tips to follow:"]
]

const content4 = [
  ["• Never litter! If you leave garbage on the ground, there’s a good chance it’ll end up in the water sooner or later. This goes especially for cigarette butts. If you’re a smoker, never throw cigarette butts on the ground."],
  ["• Don’t dispose of waste through drainage systems."],
  ["• Always clean up any chemicals you accidentally spill on the ground. This includes a variety of chemicals commonly used in automobiles like antifreeze and brake fluid."],
  ["• Avoid using especially harmful chemicals and fertilizers in your yard and garden."],
  ["• Research and use household cleaning supplies (e.g. detergents, body washes, air fresheners, etc) that are least harmful to the environment."],
  ["• Get involved and advocate for the changes you want to see on the local level!"],
]


function Course6Lesson2() {
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
    <LessonNumber lessonText="Lesson 2"/>
    <TitleHeader title="Nonpoint Source Pollution" type="main" />
    <QuoteHighlight quoteText="Though plastic is the most common pollutant in our oceans, there are many others that have a substantial and negative impact on these ecosystems as well."/>
    <Textbox content={content1} />
    <GreyBoxHighlight content={content2} />
    <img src='/lessons/43.jpg' />
    <Textbox content={content3} />
    <GreyBoxHighlight content={content4} />
    <StickyButton />
  </div>
  );
}

export default Course6Lesson2
