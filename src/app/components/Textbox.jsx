import React from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

function Paragraph({ paragraph }) {
  return (
    <div>
      {paragraph.map((text, i) => {
        const parts = text.split(/(<green>.*?<\/green>)/g);
        return (
          <span key={i}>
            {parts.map((part, index) => (part.startsWith('<green>') ? (
              <span key={index} className={styles['green-text']}>
                {part.replace(/<\/?green>/g, '')}
              </span>
            ) : (
              <span key={index} className={styles['black-text']}>
                {part}
              </span>
            )))}
          </span>
        );
      })}
    </div>
  );
}

Paragraph.propTypes = {
  paragraph: PropTypes.array.isRequired,
};

export default function Textbox({ content }) {
  return (
    <div>
      {content.map((paragraph, i) => (
        <div className={styles.text} key={i}>
          <Paragraph paragraph={paragraph} />
          {i !== content.length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

Textbox.propTypes = {
  content: PropTypes.array.isRequired,
};
