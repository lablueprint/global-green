"use client";

import React, { useState } from "react";
import VertNavbar from "src/app/coursenavbar/page.jsx";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from "./page.module.css";

function Module({ modules, currentIndex, handlePrevClick, handleNextClick }) {
  const currentModule = modules[currentIndex];

  return (
    <div className={(styles.wrapper, styles.font)}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap"
      />
      <h1>{currentModule.moduleName}</h1>
      <h2>{currentModule.lessonTitle}</h2>
      <p>{currentModule.text}</p>
      <img
        className={styles.lessonImage}
        src={currentModule.imageUrl}
        alt="Lesson Image"
      />
      <div>
        {currentIndex != 0 && (
          <Button
            className={styles.previousButton}
            variant="outlined"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <KeyboardArrowLeftIcon />
            Previous
          </Button>
        )}

        {currentIndex !== modules.length - 1 && (
          <Button
            className={styles.nextButton}
            variant="outlined"
            onClick={handleNextClick}
            disabled={currentIndex === modules.length - 1}
          >
            Next
            <KeyboardArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

function Example() {
  const data = [
    {
      moduleName: "Course 1: Plastics and Recycling",
      lessonTitle:
        "Lesson 1: Introduction to the Plastics and Recycling Course",
      text: "Plastic is all around us. It’s in our kitchens, shoes, entertainment systems, vehicles, and even our clothing. It is versatile—it can be light yet durable or soft and malleable—and there is virtually no industry in the world that doesn’t have some application for plastic. Chances are that you can see multiple pieces of one plastic or another in your immediate surroundings. Given its ubiquity, it can be easy to take such an abundance of plastic for granted. But what exactly is plastic, where does it come from, and how has it managed to so radically transform the world we live in since it was first created in the early 20th century? If you find yourself asking questions like these, you’re in the right place! Over the span of this Plastics and Recycling course, we’re going to take a deep dive into a variety of topics relating to the history, manufacture, applications, and hazards of plastic in our world today.",
      imageUrl: "https://cdn.media.amplience.net/i/hc/img002",
    },
    {
      moduleName: "Course 1: Plastics and Recycling",
      lessonTitle: "Lesson 2: Where Does Plastic Come From?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/files/blog_tuxedosam-friends_07282022_01-TX-CHIP.jpg?v=1659050063",
    },
    {
      moduleName: "Course 1: Plastics and Recycling",
      lessonTitle: "Lesson 3: Resin Identification Codes",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      imageUrl:
        "https://i0.wp.com/babylibrarians.com/wp-content/uploads/2019/02/clifford-the-big-red-dog.jpg?resize=1363%2C480&ssl=1",
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
    if (collapseButton.type === KeyboardDoubleArrowLeftIcon) {
      setCollapseButton(<KeyboardDoubleArrowRightIcon />);
      document.getElementById("navbar").style.display = "none";
    } else {
      setCollapseButton(<KeyboardDoubleArrowLeftIcon />);
      document.getElementById("navbar").style.display = "";
    }
  }

  const [collapseButton, setCollapseButton] = useState(
    <KeyboardDoubleArrowLeftIcon />
  );

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
        <div className={styles.leftBorder}>
          <Button
            variant="outlined"
            onClick={collapseNavBar}
            className={styles.button}
            class="close"
          >
            {collapseButton}
          </Button>
          <Module
            modules={data}
            currentIndex={currentIndex}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Example;
