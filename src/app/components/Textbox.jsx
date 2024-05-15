import React from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

function Paragraph({ paragraph }) {
  return (
    <div>
      {paragraph.map((text, i) => (
        <span key={i}>
          {text.split(/(<green>.*?<\/green>|<title>.*?<\/title>|<greenCenterText>.*?<\/greenCenterText>)/g).map((part, index) => {
            if (/<green>.*<\/green>/.test(part)) {
              return (
                <span key={index} className={styles['green-text']}>
                  {part.replace(/<\/?green>/g, '')}
                </span>
              );
            } 
            else if (/<title>.*<\/title>/.test(part)) {
              return (
                <span key={index} className={styles['subTextTitle']}>
                  {part.replace(/<\/?title>/g, '')}
                </span>
              );
            } 
            else if (/<greenCenterText>.*<\/greenCenterText>/.test(part)) {
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
      ))}
    </div>
  );
}

Paragraph.propTypes = {
  paragraph: PropTypes.arrayOf(PropTypes.string).isRequired,
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
