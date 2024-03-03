const quizData = {
  totalQuestions: 9,
  questions: [
    {
      question: 'Match the terms with their definitions',
      type: 'matching',
      terms: [
        {term: 'Term 1', definition: 'Definition2'},
        {term: 'Term 2', definition: "Definition1"},
        {term: 'Term 3', definition: 'Definition7'},
        {term: 'Term 4', definition: 'Definition4'},
        {term: 'Term 5', definition: 'Definition5'},
        {term: 'Term 6', definition: 'Definition6'},
        {term: 'Term 7', definition: 'Definition3'},

      ],
      answer: ['Definition1', 'Definition2', 'Definition3', 'Definition4','Definition5','Definition6','Definition7'],
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."
    },
    {
      question: 'How many pounds of plastic enter the ocean every day?',
      options: ['17 Billion Pounds', '33 Billion Pounds', '52 Billion Pounds', '95 Billion Pounds'],
      type: 'multiple',
      answer: '33 Billion Pounds',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."
    },
    {
      question: 'What percentage of marine waste is plastic pollution?',
      options: ['30%', '50%', '80%', '90%'],
      type: 'multiple',
      answer: '80%',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."

    },
    {
      question: 'What type of plastics make up the majority of the Great Pacific Garbage Patch?',
      options: ['Microplastics', 'Straws', 'Bags', 'Fishing line'],
      type: 'multiple',
      answer: 'Microplastics',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."
    },
    {
      question: 'By what year is it estimated that there will be more plastic in our oceans than fish?',
      options: ['2035', '2040', '2045', '2050'],
      type: 'multiple',
      answer: '2050',
    hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."

    },
    {
      question: 'What percentage of marine debris sinks to the ocean floor?',
      options: ['15%', '40%', '70%', '95%'],
      type: 'multiple',
      answer: '70%',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."

    },
    {
      question: 'How many animals die from getting entangled in plastic debris each year?',
      options: ['50,000', '100,000', '150,000', '200,000'],
      type: 'multiple',
      answer: '100,000',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."

    },
    {
      question: 'What natural resource(s) are most plastics made from?',
      options: ['Fossil fuels', 'Cellulose', 'Lignin', 'Glucose'],
      type: 'multiple',
      answer: 'Fossil fuels',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."
    },
    {
      question: 'Put true',
      options: ['True', 'False'],
      type: 'truefalse',
      answer: 'True',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."
    },
    {
      question: 'Put false',
      options: ['True', 'False'],
      type: 'truefalse',
      answer: 'False',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit."
    },
  ],
};

// const quizData1 = [
//   {
//     totalQuestions: 7, // Adjust the total questions as needed for each quiz
//     questions: [
//       {
//         id: 0,
//         question: 'How many pounds of plastic enter the ocean every day?',
//         options: ['17 Billion Pounds', '33 Billion Pounds', '52 Billion Pounds', '95 Billion Pounds'],
//         answer: '33 Billion Pounds',
//       },
//       {
//         id: 1,
//         question: 'What percentage of marine waste is plastic pollution?',
//         options: ['30%', '50%', '80%', '90%'],
//         answer: '80%',
//       },
//       {
//         id: 2,
//         question: 'What type of plastics make up the majority of the Great Pacific Garbage Patch?',
//         options: ['Microplastics', 'Straws', 'Bags', 'Fishing line'],
//         answer: 'Microplastics',
//       },
//       {
//         id: 3,
//         question: 'By what year is it estimated that there will be more plastic in our oceans than fish?',
//         options: ['2035', '2040', '2045', '2050'],
//         answer: '2050',
//       },
//       {
//         id: 4,
//         question: 'What percentage of marine debris sinks to the ocean floor?',
//         options: ['15%', '40%', '70%', '95%'],
//         answer: '70%',
//       },
//       {
//         id: 5,
//         question: 'How many animals die from getting entangled in plastic debris each year?',
//         options: ['50,000', '100,000', '150,000', '200,000'],
//         answer: '100,000',
//       },
//       {
//         id: 6,
//         question: 'What natural resource(s) are most plastics made from?',
//         options: ['Fossil Fuels', 'Cellulose', 'Lignin', 'Glucose'],
//         answer: 'Fossil Fuels',
//       },
//     ],
//   },
//   {
//     totalQuestions: 3, // Second quiz
//     questions: [

//       {
//         id: 7,
//         question: 'What percentage of marine debris sinks to the ocean floor?',
//         options: ['15%', '40%', '70%', '95%'],
//         answer: '70%',
//       },
//       {
//         id: 8,
//         question: 'Is Daniel cool?',
//         options: ['yes', 'no', 'maybe', 'who is daniel?'],
//         answer: 'yes',
//       },
//     ],
//   },
// ];
export default quizData;
