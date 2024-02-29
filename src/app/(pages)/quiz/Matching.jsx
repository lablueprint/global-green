import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';
import LeaderLine from 'react-leader-line';

// Predefined set of colors for matches
const matchColors = ['#FFD700', '#FF8C00', '#1E90FF', '#32CD32', '#BA55D3', '#FF69B4', '#A52A2A'];

function Matching({ terms, selectedMatches, setSelectedMatches, isAttempted }) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);

  const checkForMatch = () => {
    console.log('selected term is');
    console.log(selectedTerm);
    console.log('selectedDefinition is');
    console.log(selectedDefinition);
    let line;
  
    if (selectedTerm && selectedDefinition) {
      console.log('inside');
      line = new LeaderLine(
        document.getElementById(`answer-${selectedTerm}`),
        document.getElementById(`question-${selectedDefinition}`),
      );

      line.setOptions({
        color: '#00B353',
        size: 2,
        startPlug: 'disc',
        endPlug: 'disc',
        path: 'straight',
      });

      // setSelectedMatches((prevMatches) => [...prevMatches,
      //   {
      //     answerId: selectedTerm.id,
      //     questionId: selectedDefinition.id,
      //     lineObj: line,
      //   }]);

      setSelectedTerm(null);
      setSelectedDefinition(null);
    }
  };

  const handleTermClick = (item, index) => {
    setSelectedTerm(index); 
    checkForMatch();
    console.log(item); 
    console.log(index);
  }

  const handleDefinitionClick = (item, index) => {
    setSelectedDefinition(index);
    checkForMatch();
    console.log(item); 
    console.log(index);
  }

  useEffect(() => {
    checkForMatch();
  })

  // useEffect(() => {
  //   if (selectedTerm && selectedDefinition) {
  //     const newMatch = {
  //       term: selectedTerm,
  //       definition: selectedDefinition,
  //       // Assign a color from the predefined set, cycling based on the current number of matches
  //       color: matchColors[selectedMatches.length % matchColors.length],
  //     };
  //     setSelectedMatches(prevMatches => [...prevMatches, newMatch]);
  //     setSelectedTerm('');
  //     setSelectedDefinition('');
  //   }
  // }, [selectedTerm, selectedDefinition, setSelectedMatches, selectedMatches]);

  return (
    <div>
      <div className={styles.selectorContainer}>
        <div className={styles.termsContainer}>
          {terms.map((item, index) => (
            <div
              onClick={() => handleTermClick(item, index)}
              key={`answer-${index}`}
              id={`answer-${index}`}
              disabled={isAttempted}
              style={{
                margin: '30px', 
                padding: '10px 10px', 
                border: '1px solid black',
                backgroundColor: selectedMatches.find(match => match.term === item.term)?.color || 'transparent'
              }}
            >
              {item.term}
            </div>
          ))}
        </div>
        <div className={styles.definitionsContainer}>
          {terms.map((item, index) => (
            <div
              onClick={() => handleDefinitionClick(item, index)}
              key={`question-${index}`}
              id={`question-${index}`}
              disabled={isAttempted}
              style={{
                margin: '30px', 
                padding: '10px 10px', 
                border: '1px solid black',
                backgroundColor: selectedMatches.find(match => match.definition === item.definition)?.color || 'transparent'
              }}
            >
              {item.definition}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Matching.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({
    term: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
  })).isRequired,
  selectedMatches: PropTypes.arrayOf(PropTypes.shape({
    term: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    // Include color in the PropTypes validation
    color: PropTypes.string,
  })).isRequired,
  setSelectedMatches: PropTypes.func.isRequired,
  isAttempted: PropTypes.bool,
};

Matching.defaultProps = {
  isAttempted: false,
};

export default Matching;
