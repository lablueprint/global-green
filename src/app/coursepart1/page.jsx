"use client";

import React, { useState } from "react";
import VertNavbar from "src/app/coursenavbar/page.jsx";
import styles from "./page.module.css";

function Module({ modules, currentIndex, handlePrevClick, handleNextClick }) {
  const currentModule = modules[currentIndex];
  // console.log(cssMargin)

  return (
    <div className={styles.leftBorder}>
      <h1>{currentModule.moduleName}</h1>
      <h2>{currentModule.lessonTitle}</h2>
      <p>{currentModule.text}</p>
      <img src={currentModule.imageUrl} alt="Lesson Image" />

      <div>
        <button onClick={handlePrevClick} disabled={currentIndex === 0}>
          Previous Module
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentIndex === modules.length - 1}
        >
          Next Module
        </button>
      </div>
    </div>
  );
}

function Example() {
  const data = [
    {
      moduleName: "Module 1",
      lessonTitle: "Curious George",
      text: "Quick! Take a look around you and find the nearest plastic item. What do you notice about it? Is it light or heavy? Transparent or opaque? Flexible or rigid? Depending on which characteristics you note, it could be one of many different types of plastic. The plastic used in a common water bottle is different from that used in PVC pipes, shampoo bottles, and shopping bags. While we refer to each of these common items as plastic, the truth is that there are many different types of plastics that are tailored towards different use cases. Plastic is a synthetic material made from organic polymers, which means that it is created by taking natural resources, such as natural gas and oil, and processing them into workable materials. These natural resources can be processed in different ways to create products with varying properties, placing them on a spectrum of weight, durability, transparency, and so on.",
      imageUrl: "https://cdn.media.amplience.net/i/hc/img002",
    },
    {
      moduleName: "Module 2",
      lessonTitle: "Hilda",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/IkUOdY7MFcTev__-2fPZpDfXE4Q=/0x30:1500x815/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23101926/hilda1.jpeg",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  function collapseNavBar() {
    if (collapseButton == "<<") {
      setCollapseButton(">>");
      document.getElementById("navbar").style.display = "none";
    } else {
      setCollapseButton("<<");
      document.getElementById("navbar").style.display = "";
    }
  }

  const [collapseButton, setCollapseButton] = useState("<<");
  return (
    <div className={styles.flexCol}>
      <div id="navbar" className={styles.navBarWidth}>
        <VertNavbar
          modules={data}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      </div>
      <div className={styles.moduleWidth}>
        <button onClick={collapseNavBar} class="close">
          {collapseButton}
        </button>
        <Module
          modules={data}
          currentIndex={currentIndex}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </div>
    </div>
  );
}

export default Example;
