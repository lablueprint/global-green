'use client';

import { React } from 'react';
import styles from '../../../page.module.css';

import TitleHeader from '@/app/components/TitleHeader';


export default function GreyBoxHighlight() {
  return (
    <div className={styles['grey-box-highlight']}>
        It is versatile—it can be light yet durable or soft and malleable—and there is virtually no industry in the world that doesn’t 
        have some application for plastic. Chances are that you can see multiple pieces of one plastic or another in your immediate surroundings.
      <br />
      <br />
        Given its ubiquity, it can be easy to take such an abundance of plastic for granted. But what exactly is plastic, where does it come from, 
        and how has it managed to so radically transform the world we live in since it was first created in the early 20th century?
      <br />
      <br />
        If you find yourself asking questions like these, you’re in the right place! Over the span of this <span style={{ color: 'green' }}>Plastics and Recycling course</span>, 
        we’re going to take a deep dive into a variety of topics relating to the history, manufacture, applications, and hazards of plastic in our world today.
      <br />
      <br />
        By the end of this course, you’ll have the tools you need to understand the origins, benefits, and hazards of the modern world’s reliance on plastic.
      <br />
      <br />
      Image Here
      <br />
      Drop Down Menu Here
      <br />
      <br />
      The goal of this course is to help educate you so that you can make informed, thoughtful choices on a day to day basis while equipping you with the knowledge you need to 
      understand and change the world around you. Because, like plastic, laws and regulations are malleable. <span style = {{color : 'green'}}>Collectively, we can take direct action to combat the hazardous and 
      toxic effects of plastic production and pollution!</span>
    </div>
  );
}
