import React, { useState, useEffect } from 'react';
import styles from './page.module.css'

function TrueFalse({
  question,
  options,
  selectedAnswer,
  isAttempted,
  onOptionSelect, // Renamed from handleSelect for clarity

}) {
  const [selected, setSelected] = useState(selectedAnswer); // Define the selected state

  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  // Updated to call onOptionSelect, which is now passed from Quiz component
  function handleSelect(option) {
    onOptionSelect(option); // This will be provided by the Quiz component
  }

  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
              <button
              type="button"
              className={styles.choiceButton}
              key={option}
              onClick={() => handleSelect(option)}
              disabled={isAttempted}
              style={{
                backgroundColor: selected === option ? 'lightgrey' : 'white',
              }}
            >
          {option}
        </button>
      ))}
    </div>
  );
}

export default TrueFalse;
