'use client';

import { React } from 'react';
import styles from '../../../page.module.css';

import TitleHeader from '@/app/components/TitleHeader';


export default function GreyBoxHighlight() {
  return (
    <div className={styles['grey-box-highlight']}>
        Unlike the cellulose in plants or the wood used to make paper, plastic is a wholly synthetic, or man-made, material. But that begs the question: just what is plastic, and how is it made? 
        You may be surprised to discover <span style={{ color: 'green' }}>that the main resource that goes into synthesizing plastic is fossil fuels.</span>
      <br />
      <br />
        <TitleHeader title="Hold on - fossil fuels?" type="sub" />
      <br />
      <br />
        Like the fuel we fill up the gas tanks of our cars with? Yes! Despite very different appearances, <span style={{ color: 'green' }}>the vast majority of consumer plastics in the world 
        are made from fossil fuels, especially crude oil.</span> But how does crude oil become a disposable bottle you can drink water from?
      <br />
      <br />
        The answer, perhaps unsurprisingly, can get a little technical. That’s why we’re going to follow that plastic water bottle back in time so that we can follow its journey from the Earth’s crust to our 
        homes.
      <br />
      <br />
        <div className={styles.listContainer}>
        <TitleHeader title="Journey of a Plastic Bottle" type="sub" />
        <div className={styles.content}>
            <p>
            1. It all begins with an oil well. Petrochemical companies extract crude oil 
            from the Earth’s crust and pipe it to a processing facility, where it is subjected to extreme 
            heat and pressure in order to purify, refine, and distill these natural resources into various 
            component molecules.
            </p>
            <p>
            2. The processing facility uses industrial equipment to turn those natural
            resources into pellets like those pictured below to expedite shipping and manufacturing. 
            Similarly, recycled plastic can be broken back down into flakes so that they can be used in the 
            same process.
            </p>
            Image here
            <p>
            3. The pellets are then shipped to a manufacturing facility. Importantly, spillage of these pellets
            occurs at every point of the plastic-making process, and this exacerbates the issue of plastic pollution.
            Proper handling and shipping of these materials is necessary to prevent these long-lasting pellets from 
            making their way into our ecosystems!
            </p>
            <p>
            4. Once these pellets arrive at a manufacturing facility, they are melted down into a workable liquid that
            can be molded into various shapes and sizes. That means that the solid piece of plastic that composes our 
            humble water bottle is actually made from many of these pellets melted together.
            </p>  
        </div>
        </div>
      <br />
      <br />
        <TitleHeader title="The Cost of Plastic" type="sub" />
      <br />
      <br />
        And that’s how our plastic water bottle was made! It can be surprising to realize how much work and energy goes into producing these consumer goods
        when we only ever see them on store shelves.
      <br />
      <br />
        These processes help to give plastic its unique combination of durability and malleability, but it doesn’t come without a cost. Whereas organic materials
        naturally break down and degrade over time, <span style={{ color: 'green' }}> plastics are designed specifically to resist the forces of weathering and decay.</span>
      <br />
      <br />
        The durability of plastic is convenient when you’re carrying home your groceries, but this durability is less helpful once that plastic has been disposed of. 
        Rather than breaking down like organic substances, plastic can remain in ecosystems for decades without breaking down. And, once it does finally break down,
        it can become microplastic and release toxins into the surrounding ecosystem. 
      <br />
      <br />
        Image here
      <br />
      <br />
        <TitleHeader title="So what can we do?" type = "sub" />
      <br />
      <br />
        It is currently estimated that over 8 million tons of plastic enter our oceans each year. Due to the environmental hazards posed by plastic pollution,
        it is essential that we take measures to reduce the amount of plastic waste that makes its way into our ecosystems.
      <br />
      <br />
        One key means of achieving this is <span style={{ color: 'green' }}>following proper recycling practices to ensure that as little plastic as possible makes it into our ecosystems and waterways.</span>
        Continue onto Lesson 2: Resin Identification Codes to learn more about how to identify the different types of plastic that companies produce in the processes 
        described above and whether or not they are recyclable!
      <br />
      <br />


    </div>
  );
}
