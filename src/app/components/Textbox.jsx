import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

function Paragraph({ paragraph }) {
  return (
    <div>
      {paragraph.map((text, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? styles['black-text'] : styles['green-text']}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export default function Textbox({ content }) {
  return (
    <div>
      {content.map((paragraph, i) => (
        <div className={styles.text} key={paragraph}>
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

Paragraph.propTypes = {
  paragraph: PropTypes.array.isRequired,
};
