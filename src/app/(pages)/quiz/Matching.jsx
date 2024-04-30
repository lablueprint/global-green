import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LeaderLine from 'react-leader-line';
import styles from './page.module.css';

function Matching({
  options, selectedMatches, setSelectedMatches, isAttempted = false,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (selectedOption !== null && selectedDefinition !== null && !isAttempted) {
      const updatedMatches = selectedMatches.filter((match) => {
        const isMatchedWithOption = match.option === selectedOption;
        const isMatchedWithDefinition = match.definition === selectedDefinition;

        // If the current match involves either the selected option or definition, remove the line
        if (isMatchedWithOption || isMatchedWithDefinition) {
          match.lineObj.remove(); // Remove the line visually
          return false; // Exclude this match from the updated array
        }

        return true;
      });

      // update the state to reflect the removal of any existing matches
      setSelectedMatches(updatedMatches);
      setMatchedPairs(updatedMatches.map(({ option, definition }) => ({ option, definition })));

      // create a new line and match
      const line = new LeaderLine(
        document.getElementById(`answer-${selectedOption}`),
        document.getElementById(`question-${selectedDefinition}`),
        {
          color: '#6DAAE0',
          size: 3,
          startPlug: 'behind',
          endPlug: 'behind',
          path: 'straight',
        },
      );

      const newMatch = {
        option: selectedOption,
        definition: selectedDefinition,
        lineObj: line,
      };

      setSelectedMatches((prevMatches) => [...prevMatches, newMatch]);
      setMatchedPairs((prevPairs) => [...prevPairs, { option: selectedOption, definition: selectedDefinition }]);

      // Reset selections
      setSelectedOption(null);
      setSelectedDefinition(null);
    }
  }, [selectedOption, selectedDefinition, setSelectedMatches, isAttempted, selectedMatches]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleDefinitionClick = (index) => {
    setSelectedDefinition(index);
  };

  // function to determine if an item is matched
  const isMatched = (index, type) => matchedPairs.some((pair) => pair[type] === index);

  return (
    <div>
      <div className={styles.questionText}>
        {/* <p>{question}</p> */}
      </div>
        <div className={styles.matchingContainer}>
          {options.map((item, index) => (
            <div className={styles.rowContainer} key={`pair-${index}`}>
              <div
                onClick={() => handleOptionClick(index)}
                key={`answer-${index}`}
                id={`answer-${index}`}
                className={`${styles.optionBox} ${selectedOption === index ? styles.selected : ''} ${isMatched(index, 'option') ? styles.matched : ''}`}
                style={{
                  outline: isMatched(index, 'option') ? '2px solid green' : '',
                }}
              >
                {item}
              </div>
              <div
                onClick={() => handleDefinitionClick(index)}
                key={`question-${index}`}
                id={`question-${index}`}
                className={`${styles.definitionBox} ${selectedDefinition === index ? styles.selected : ''} ${isMatched(index, 'definition') ? styles.matched : ''}`}
                style={{
                  outline: isMatched(index, 'definition') ? '2px solid green' : '',
                }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

Matching.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
  })).isRequired,
  selectedMatches: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.number.isRequired,
    definition: PropTypes.number.isRequired,
    lineObj: PropTypes.instanceOf(LeaderLine),
  })).isRequired,
  setSelectedMatches: PropTypes.func.isRequired,
  isAttempted: PropTypes.bool,
};

export default Matching;
