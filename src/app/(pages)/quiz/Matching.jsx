import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';
import LeaderLine from 'react-leader-line';

function Matching({ terms, selectedMatches, setSelectedMatches, isAttempted}) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);

  useEffect(() => {
    if (selectedTerm !== null && selectedDefinition !== null && !isAttempted) {
      const line = new LeaderLine(
        document.getElementById(`answer-${selectedTerm}`),
        document.getElementById(`question-${selectedDefinition}`),
        {
          color: '#00B353', // Set the line color to green
          size: 2,
          startPlug: 'disc',
          endPlug: 'disc',
          path: 'straight',
        }
      );
  
      // Update selected matches with the new match
      setSelectedMatches((prevMatches) => [
        ...prevMatches,
        {
          term: selectedTerm,
          definition: selectedDefinition,
          lineObj: line,
        },
      ]);
  
      // Reset selections
      setSelectedTerm(null);
      setSelectedDefinition(null);
  
      // return () => line.remove();
    }
  }, [selectedTerm, selectedDefinition, setSelectedMatches, isAttempted]);
  

  const handleTermClick = (item, index) => {
    setSelectedTerm(index);
  };

  const handleDefinitionClick = (item, index) => {
    setSelectedDefinition(index);
  };

  return (
    <div>
      <div className={styles.selectorContainer}>
        <div className={styles.termsContainer}>
          {terms.map((item, index) => (
            <div
              onClick={() => handleTermClick(item, index)}
              key={`answer-${index}`}
              id={`answer-${index}`}
              style={{
                margin: '30px',
                padding: '10px 10px',
                border: '1px solid black',
                backgroundColor: selectedMatches.find(match => match.term === index)?.lineObj ? '#00B353' : 'transparent', // Highlight if matched
                pointerEvents: isAttempted ? 'none' : 'auto',
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
              style={{
                margin: '30px',
                padding: '10px 10px',
                border: '1px solid black',
                backgroundColor: selectedMatches.find(match => match.definition === index)?.lineObj ? '#00B353' : 'transparent', // Highlight if matched
                pointerEvents: isAttempted ? 'none' : 'auto',
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
