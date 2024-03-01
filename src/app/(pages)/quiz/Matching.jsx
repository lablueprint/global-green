import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';
import LeaderLine from 'react-leader-line';

function Matching({ terms, selectedMatches, setSelectedMatches, isAttempted, clearLines, setClearLines }) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (selectedTerm !== null && selectedDefinition !== null && !isAttempted) {
      const line = new LeaderLine(
        document.getElementById(`answer-${selectedTerm}`),
        document.getElementById(`question-${selectedDefinition}`),
        {
          color: 'grey', // Set the line color to green
          size: 3,
          startPlug: 'disc',
          endPlug: 'disc',
          path: 'straight',
        }
      );

      // Update selected matches with the new match
      const newMatch = {
        term: selectedTerm,
        definition: selectedDefinition,
        lineObj: line,
      };
      setSelectedMatches((prevMatches) => [...prevMatches, newMatch]);
      setMatchedPairs((prevPairs) => [...prevPairs, { term: selectedTerm, definition: selectedDefinition }]);

      // Reset selections
      setSelectedTerm(null);
      setSelectedDefinition(null);
    }
  }, [selectedTerm, selectedDefinition, setSelectedMatches, isAttempted]);

  useEffect(() => {
    if (clearLines) {
      selectedMatches.forEach((match) => {
        match.lineObj.remove();
      });
      setSelectedMatches([]);
      setClearLines(false);
      setMatchedPairs([]); // Clear matched pairs as well
    }
  }, [clearLines, selectedMatches, setSelectedMatches, setClearLines]);

  const handleTermClick = (index) => {
    setSelectedTerm(index); // Set the selected term index
  };

  const handleDefinitionClick = (index) => {
    setSelectedDefinition(index); // Set the selected definition index
  };

  // Function to determine if an item is matched
  const isMatched = (index, type) => {
    return matchedPairs.some(pair => pair[type] === index);
  };

  return (
    <div>
      <div className={styles.selectorContainer}>
        <div className={styles.termsContainer}>
          {terms.map((item, index) => (
            <div
              onClick={() => handleTermClick(index)}
              key={`answer-${index}`}
              id={`answer-${index}`}
              className={`${styles.termBox} ${selectedTerm === index ? styles.selected : ''} ${isMatched(index, 'term') ? styles.matched : ''}`}
              style={{
                // backgroundColor: isAttempted ? 'lightgrey' : (selectedTerm === index ? 'lightblue' : 'pink'),
                outline: isAttempted ? "lightgrey" : (selectedTerm === index ? 'green' : 'lightgrey'),
                outline: isMatched(index, 'term') ? '2px solid green' : '',
              }}
            >
              {item.term}
            </div>
          ))}
        </div>
        <div className={styles.definitionsContainer}>
          {terms.map((item, index) => (
            <div
              onClick={() => handleDefinitionClick(index)}
              key={`question-${index}`}
              id={`question-${index}`}
              className={`${styles.definitionBox} ${selectedDefinition === index ? styles.selected : ''} ${isMatched(index, 'definition') ? styles.matched : ''}`}
              style={{
                // backgroundColor: isAttempted ? 'lightgrey' : (selectedDefinition === index ? 'lightblue' : 'pink'),
                outline: isAttempted ? "lightgrey" : (selectedTerm === index ? 'green' : 'lightgrey'),
                outline: isMatched(index, 'definition') ? '2px solid green' : '',
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
    term: PropTypes.number.isRequired,
    definition: PropTypes.number.isRequired,
    lineObj: PropTypes.instanceOf(LeaderLine),
  })).isRequired,
  setSelectedMatches: PropTypes.func.isRequired,
  isAttempted: PropTypes.bool,
  clearLines: PropTypes.bool.isRequired,
  setClearLines: PropTypes.func.isRequired,
};

Matching.defaultProps = {
  isAttempted: false,
};

export default Matching;
