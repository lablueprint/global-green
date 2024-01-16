const quizData = [
  {
    totalQuestions: 4, // Adjust the total questions as needed for each quiz
    questions: [
      {
        id: 0,
        question: 'How tall is Daniel?',
        options: ['5 7', '6 2', '7 5', '3 2'],
        answer: '6 2',
      },
      {
        id: 1,
        question: 'How many pounds of plastic enter the ocean every day?',
        options: ['17 Billion Pounds', '33 Billion Pounds', '52 Billion Pounds', '95 Billion Pounds'],
        answer: '33 Billion Pounds',
      },
      {
        id: 2,
        question: 'What percentage of marine waste is plastic pollution?',
        options: ['30%', '50%', '80%', '90%'],
        answer: '80%',
      },
      {
        id: 3,
        question: 'What type of plastics make up the majority of the Great Pacific Garbage Patch?',
        options: ['Microplastics', 'Straws', 'Bags', 'Fishing line'],
        answer: 'Microplastics',
      }
    ],
  },
  {
    totalQuestions: 3, // Second quiz
    questions: [
      {
        id: 4,
        question: 'By what year is it estimated that there will be more plastic in our oceans than fish?',
        options: ['2035', '2040', '2045', '2050'],
        answer: '2050',
      },
      {
        id: 5,
        question: 'What percentage of marine debris sinks to the ocean floor?',
        options: ['15%', '40%', '70%', '95%'],
        answer: '70%',
      },
      {
        id: 6,
        question: 'Is Daniel cool?',
        options: ['yes', 'no', 'maybe', 'who is daniel?'],
        answer: 'yes',
      }
    ],
  },
];

export default quizData;