const quizData = {
  totalQuestions: 9,
  questions: [
    {
      id: 1,
      question: 'How many pounds of plastic enter the ocean every day?',
      options: ['17 Billion Pounds', '33 Billion Pounds', '52 Billion Pounds', '95 Billion Pounds'],
      type: 'multiple',
      answer: '33 Billion Pounds',
    },
    {
      id: 2,
      question: 'What percentage of marine waste is plastic pollution?',
      options: ['30%', '50%', '80%', '90%'],
      type: 'multiple',
      answer: '80%',
    },
    {
      id: 3,
      question: 'What type of plastics make up the majority of the Great Pacific Garbage Patch?',
      options: ['Microplastics', 'Straws', 'Bags', 'Fishing line'],
      type: 'multiple',
      answer: 'Microplastics',
    },
    {
      id: 4,
      question: 'By what year is it estimated that there will be more plastic in our oceans than fish?',
      options: ['2035', '2040', '2045', '2050'],
      type: 'multiple',
      answer: '2050',
    },
    {
      id: 5,
      question: 'What percentage of marine debris sinks to the ocean floor?',
      options: ['15%', '40%', '70%', '95%'],
      type: 'multiple',
      answer: '70%',
    },
    {
      id: 6,
      question: 'How many animals die from getting entangled in plastic debris each year?',
      options: ['50,000', '100,000', '150,000', '200,000'],
      type: 'multiple',
      answer: '100,000',
    },
    {
      id: 7,
      question: 'What natural resource(s) are most plastics made from?',
      options: ['Fossil fuels', 'Cellulose', 'Lignin', 'Glucose'],
      type: 'multiple',
      answer: 'Fossil fuels',
    },
    {
      id: 8,
      question: 'Put true',
      options: ['True', 'False'],
      type: 'truefalse',
      answer: 'True',
    },
    {
      id: 9,
      question: 'Put false',
      options: ['True', 'False'],
      type: 'truefalse',
      answer: 'False',
    },
    // {
    //   id: 10,
    //   prompt: 'click a term to match it with a definition',
    //   options: [{
    //     id: 100,
    //     question: 'question1',
    //     answer: 'ans1',
    //   }, {
    //     id: 200,
    //     question: 'question2',
    //     answer: 'ans2',
    //   }],
    //   type: 'select',
    // },
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
