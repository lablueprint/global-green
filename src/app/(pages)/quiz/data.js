const quizData = {
  totalQuestions: 9,
  questions: [
    {
      question: 'Match the seven recycling codes with their technical (chemical) names.',
      type: 'matching',
      terms: [
        {term: '♳', definition: 'High-density polyethylene (HDPE)'},
        {term: '♵', definition: "Low-density polyethylene (LDPE)"},
        {term: '♷', definition: 'Polypropylene (PP)'},
        {term: '♴', definition: 'Polyethylene terephthalate (PET)'},
        {term: '♸', definition: 'Polystyrene (PS)'},
        {term: '♶', definition: 'Mixed plastics'},
        {term: '♹', definition: 'Polyvinyl chloride (PVC)'},
      ],
      answer: ['Definition1', 'Definition2', 'Definition3', 'Definition4','Definition5','Definition6','Definition7'],
      hint: 'fierjfiefjeijLorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
    {
      question: 'What natural resource(s) are most plastics made from?',
      options: ['Fossil fuels', 'Cellulose', 'Lignin', 'Glucose'],
      type: 'multiple',
      answer: 'Fossil fuels',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },  
    {
      question: "Select all of the following common plastic item(s) that are recyclable curbside (non-industrially).",
      options: ['Soda bottles', 'Milk Jugs', 'Grocery Bags', 'Bubble wrap', 'Plastic Trays', 'Chip bags', 'Solo Cups', 'Straws', 'Shampoo Bottles'],
      type: 'checkAllThatApply',
      answer: ['Soda bottles', 'Milk Jugs', 'Plastic Trays', 'Shampoo bottles'],
      hint: 'Different types of plastic require different manufacturing processes. Plastics with RIC 1-3 are usually recyclable curbside.',
      explanation: "Renewable energy sources are replenished naturally and include solar and wind energy.",
      points: '10'
    },
    {
      question: 'How many pounds of plastic enter the ocean every day?',
      options: ['17 Billion Pounds', '33 Billion Pounds', '52 Billion Pounds', '95 Billion Pounds'],
      type: 'multiple',
      answer: '33 Billion Pounds',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
    {
      question: 'What percentage of marine waste is plastic pollution?',
      options: ['30%', '50%', '80%', '90%'],
      type: 'multiple',
      answer: '80%',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
    {
      question: 'What type of plastics make up the majority of the Great Pacific Garbage Patch?',
      options: ['Microplastics', 'Straws', 'Bags', 'Fishing line'],
      type: 'multiple',
      answer: 'Microplastics',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
    {
      question: 'By what year is it estimated that there will be more plastic in our oceans than fish?',
      options: ['2035', '2040', '2045', '2050'],
      type: 'multiple',
      answer: '2050',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'

    },
    {
      question: 'What percentage of marine debris sinks to the ocean floor?',
      options: ['15%', '40%', '70%', '95%'],
      type: 'multiple',
      answer: '70%',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
    {
      question: 'How many animals die from getting entangled in plastic debris each year?',
      options: ['50,000', '100,000', '150,000', '200,000'],
      type: 'multiple',
      answer: '100,000',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'

    },
    {
      question: 'Over 75% of plastic water bottles in the U.S. are made from ♳ PET plastics.',
      options: ['True', 'False'],
      type: 'truefalse',
      answer: 'True',
      hint: 'Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
  ],
};

export default quizData;
