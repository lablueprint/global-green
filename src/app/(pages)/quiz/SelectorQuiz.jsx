import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

// Predefined set of colors for matches
const matchColors = ['#FFD700', '#FF8C00', '#1E90FF', '#32CD32', '#BA55D3', '#FF69B4', '#A52A2A'];

function SelectorQuiz({ terms, selectedMatches, setSelectedMatches, isAttempted }) {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedDefinition, setSelectedDefinition] = useState('');

  useEffect(() => {
    if (selectedTerm && selectedDefinition) {
      const newMatch = {
        term: selectedTerm,
        definition: selectedDefinition,
        // Assign a color from the predefined set, cycling based on the current number of matches
        color: matchColors[selectedMatches.length % matchColors.length],
      };
      setSelectedMatches(prevMatches => [...prevMatches, newMatch]);
      setSelectedTerm('');
      setSelectedDefinition('');
    }
  }, [selectedTerm, selectedDefinition, setSelectedMatches, selectedMatches]);

  return (
    <div>
      <div className={styles.selectorContainer}>
        <div className={styles.termsContainer}>
          {terms.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedTerm(item.term)}
              disabled={isAttempted}
              style={{
                backgroundColor: selectedMatches.find(match => match.term === item.term)?.color || 'transparent'
              }}
            >
              {item.term}
            </button>
          ))}
        </div>
        <div className={styles.definitionsContainer}>
          {terms.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedDefinition(item.definition)}
              disabled={isAttempted}
              style={{
                backgroundColor: selectedMatches.find(match => match.definition === item.definition)?.color || 'transparent'
              }}
            >
              {item.definition}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

SelectorQuiz.propTypes = {
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

SelectorQuiz.defaultProps = {
  isAttempted: false,
};

export default SelectorQuiz;
