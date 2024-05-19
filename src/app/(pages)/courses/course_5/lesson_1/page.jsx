'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

const content1 = [
  ["Naturally, the answer to this question will depend on a variety of factors, such as distance, budget, and time. But there might be another factor you should be taking into consideration when planning future journeys: sustainability!"],
  ["<title>Modes of Traffic</title>"],
  ["Every mode of travel relies on unique mechanisms to function properly, and as such they have relative strengths and weaknesses. For example, cars are mobile and offer unrivaled freedom of movement… when they aren’t stuck in traffic caused by there being too many drivers in an area. In contrast, you never have to worry about traffic when taking a flight, but the average commercial jet can burn as much as a gallon of fuel per second. Meanwhile, trains can carry comparable numbers of people more efficiently (in terms of fuel mileage), but even the fastest trains can’t travel as quickly as planes. So how does each mode of transit match up, and how can we decide the best way to travel for a given situation?"],
  ["<title>Fuel Economy</title>"],
  ["A key way to understand the efficiency and sustainability of different modes of travel is <green>fuel economy</green>, which broadly speaking is how much fuel it takes to move a vehicle (be it cars, trains, or planes) a given distance. Typically, this is measured in passenger-miles-per-gallon (PMPG). PMPG is a measure of fuel economy that takes into account the total number of passengers onboard. So while an automobile might have a fuel economy of 25 miles per gallon, that same automobile with 4 passengers has a fuel economy of 100 PMPG (25 miles traveled per gallon of fuel for 4 passengers)."],
  ["There is no definitive answer to what the best way to travel is. Just as it would be impractical to walk a hundred miles to visit a friend, so too is it overboard to hop on a flight for a day trip to a nearby city. Perhaps in a perfect world every destination you could want to visit would be connected by fuel-efficient high speed railways, but rail travel has not taken off in the U.S. the way that it has in other countries."],
  ["<title>Mode of Transit: Automobiles</title>"]
]

const content2 = [
  ["No doubt one of the main reasons for this is the prevalence of automobiles. There are hundreds of millions of cars in the U.S., and much of the infrastructure that has been developed reflects this. Despite this, automobiles on average are among the least efficient modes of travel available. This is especially true when taking into account that there is only an average of 1.5 passengers per vehicle at any given time. Carpooling and using public transit like buses are important ways that automobile travel can be more efficient and sustainable."],
  ["<title>Mode of Transit: Rail</title>"]
]

const content3 = [
  ['In some ways, traveling by rail is the polar opposite of getting around by car. Where automobiles transport relatively few passengers per vehicle, trains are designed precisely to carry large numbers of passengers, and rail infrastructure requires much less space than automobile infrastructure like interstates and highways. So if trains are more efficient and environmentally friendly on average than automobiles, why don’t we use them more? The main reasons for this are mobility and convenience; rail travel does not provide the same sense of freedom as traveling by car. Despite these drawbacks, trains are substantially more energy-efficient than automobiles and planes; a passenger train carrying 100 passengers has an average PMPG of 600!'],
  ['<title>Mode of Transit: Commercial Air</title>'],
];

const content4 = [
  ['The third major mode of transit we’ll investigate is commercial air travel. Flying is by far the fastest mode of transit; commercial jets average speeds just short of 600 miles per hour at cruising altitudes. This is especially impressive considering that the average commercial jet can carry anywhere from 100-200 passengers per flight. Despite the impressive speed and passenger capacity, flights require substantial amounts of fuel. For example, commercial jets can burn up to a gallon of fuel per second, meaning that a 5-hour flight from Los Angeles to New York burns roughly 18,000 gallons of fuel. Despite these staggering numbers, this still equates to roughly 20 PMPG for a flight carrying 150 passengers, making it only slightly less efficient than an automobile with a single occupant.'],
  ['<title>Strengths and Weaknesses of Different Transit</title>'],
  ['Understanding these metrics and the relative strengths and weaknesses of different modes of transit helps us make the right choices when traveling. While flying and driving both have their places in our lives, there is no denying that rail travel is by far the most efficient transit option available to us. That’s why many countries around the world, from London to Tokyo, have invested heavily in passenger rail infrastructure, which is faster and requires much less space than a car-centric infrastructure. Despite this, passenger rail travel experiences extremely low ridership in the U.S.; the average occupancy of a passenger train is only about 24 people. This is far from the case when visiting countries like China, India, and Japan, where passenger rail is a primary mode of transit for citizens.'],
  ['<title>Guidelines when Selecting Modes of Transportation</title>'],
  ['With all of this in mind, here are a few guidelines to follow when determining the best way to get around:'],
];

const content5 = [
  ['• Study up on your destination and find out what the preferred way to get around there is. If passenger trains are common, consider buying a ticket and enjoying the scenery!'],
  ['• Visitors to cities and countries who drive to or within their destination contribute to traffic congestion, so it’s best to avoid traveling by car when taking a train is an option.'],
  ['• When going very long distances, flights are comparable to driving alone in terms of fuel efficiency. But if you’re going to drive, make sure to carpool as much as possible to reduce emissions and traffic congestion.'],
  ['• Try out alternative forms of transportation like bikes! In addition to being a low-impact mode of transportation, biking lets you take in more of your surroundings than traveling by train or automobile.'],
];

function Course5Lesson1() {
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
      <TitleHeader title="Comparing Forms of Travel Based on Their Carbon Footprints" type="main" />
      <QuoteHighlight quoteText="There’s no doubt that when traveling abroad one of the first questions you have to ask is, “How will I get to my destination?” " />
      <Textbox content={content1} />
      <img src="/lessons/36.jpg" />
      <Textbox content={content2} />
      <img src="/lessons/37.jpg" />
      <Textbox content={content3} />
      <img src="/lessons/38.jpg" />
      <Textbox content={content4} />
      <GreyBoxHighlight content={content5} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 1'); }} />
    </div>
  );
}

export default Course5Lesson1;
