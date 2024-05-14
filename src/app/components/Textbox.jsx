import React from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

function Paragraph({ paragraph }) {
  return (
    <div>
      {paragraph.map((text, i) => {
        const parts = text.split(/(<green>.*?<\/green>|<title>.*?<\/title>)/g);
        return (
          <span key={i}>
            {parts.map((part, index) => {
              if (part.startsWith('<green>')) {
                return (
                  <span key={index} className={styles['green-text']}>
                    {part.replace(/<\/?green>/g, '')}
                  </span>
                );
              } 
              else if (part.startsWith('<title>')) {
                return (
                  <span key={index} className={styles['subTitle']}>
                    {part.replace(/<\/?title>/g, '')}
                  </span>
                );
              } 
              else if (part.startsWith('<greenCenterText>')) {
                return (
                  <span key={index} className={styles['greenCenterText']}>
                    {part.replace(/<\/?greenCenterText>/g, '')}
                  </span>
                );
              } 
              else {
                return (
                  <span key={index} className={styles['black-text']}>
                    {part}
                  </span>
                );
              }
            })}
          </span>
        );
      })}
    </div>
  );
}

// Paragraph.propTypes = {
//   paragraph: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

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
