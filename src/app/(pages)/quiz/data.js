const quizData = {
  totalQuestions: 9,
  questions: [
    {
      question: 'What is the technical term for the numbers imprinted on most plastics? Example: ♳?',
      options: ['Recyler\'s Mark', 'Polymer ID', 'Plastic Security Number', 'Resin Identification Code'],
      type: 'multiple',
      answer: 'Resin Identification Code',
      hint: 'Think about what plastic is made of! Why is knowing this important to recycling facilities?',
      explanation: "Lorem ipsum dolor sit amet consectetur. Lectus ut morbi dolor in vehicula sem magna facilisi. Non et amet viverra id eget malesuada et pulvinar.",
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
    {
      question: "Select all of the following common plastic item(s) that are recyclable curbside (non-industrially).",
      options: ['Soda bottles', 'Milk Jugs', 'Grocery Bags', 'Bubble wrap', 'Plastic Trays', 'Chip bags', 'Solo Cups', 'Straws', 'Shampoo Bottles'],
      type: 'checkAllThatApply',
      answer: ['Soda bottles', 'Milk Jugs', 'Plastic Trays', 'Shampoo Bottles'],
      hint: 'Different types of plastic require different manufacturing processes. Plastics with RIC 1-3 are usually recyclable curbside.',
      explanation: "Renewable energy sources are replenished naturally and include solar and wind energy.",
      points: '10'
    },
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
      hint: 'Think about what plastic is made of! Why is knowing this important to recycling facilities?',
      explanation: "This is an explanation. Lorem ipsum dolor sit amet consectetur. Turpis quisque ac porttitor lorem elit.",
      points: '10'
    },
  ],
};

export default quizData;
