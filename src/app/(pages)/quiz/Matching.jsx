import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LeaderLine from 'react-leader-line';
import styles from './page.module.css';

function Matching({
  question, terms, selectedMatches, setSelectedMatches, isAttempted = false,
}) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (selectedTerm !== null && selectedDefinition !== null && !isAttempted) {
      // First, remove existing lines connected to either the selected term or definition
      const updatedMatches = selectedMatches.filter((match) => {
        const isMatchedWithTerm = match.term === selectedTerm;
        const isMatchedWithDefinition = match.definition === selectedDefinition;

        // If the current match involves either the selected term or definition, remove the line
        if (isMatchedWithTerm || isMatchedWithDefinition) {
          match.lineObj.remove(); // Remove the line visually
          return false; // Exclude this match from the updated array
        }

        return true;
      });

      // update the state to reflect the removal of any existing matches
      setSelectedMatches(updatedMatches);
      setMatchedPairs(updatedMatches.map(({ term, definition }) => ({ term, definition })));

      // create a new line and match
      const line = new LeaderLine(
        document.getElementById(`answer-${selectedTerm}`),
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
  }, [selectedTerm, selectedDefinition, setSelectedMatches, isAttempted, selectedMatches]);

  const handleTermClick = (index) => {
    setSelectedTerm(index);
  };

  const handleDefinitionClick = (index) => {
    setSelectedDefinition(index);
  };

  // function to determine if an item is matched
  const isMatched = (index, type) => matchedPairs.some((pair) => pair[type] === index);

  return (
    <div>
      <div className={styles.questionText}>
        <p>{question}</p>
      </div>
        <div className={styles.matchingContainer}>
          {terms.map((item, index) => (
            <div className={styles.rowContainer} key={`pair-${index}`}>
              <div
                onClick={() => handleTermClick(index)}
                id={`answer-${index}`}
                className={`${styles.termBox} ${selectedTerm === index ? styles.selected : ''} ${isMatched(index, 'term') ? styles.matched : ''}`}
              >
                {item.term}
              </div>
              <div
                onClick={() => handleDefinitionClick(index)}
                id={`question-${index}`}
                className={`${styles.definitionBox} ${selectedDefinition === index ? styles.selected : ''} ${isMatched(index, 'definition') ? styles.matched : ''}`}
              >
                {item.definition}
              </div>
            </div>
          ))}
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
};

export default Matching;
