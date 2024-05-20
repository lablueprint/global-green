'use client';

import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { BsChevronDown } from 'react-icons/bs';
import styles from './page.module.css';
import Textbox from './Textbox';

function DropdownComponent({
  title, content, open, setOpen,
}) {
  return (
    <div className={styles.dropdown}>
      <button className={styles['dropdown-button']} type="submit" onClick={setOpen}>
        <div className={styles['dropdown-title']}>{title}</div>
        <BsChevronDown size="2.75%" color="black" />
      </button>
      {open
        && (
        <div className={styles['dropdown-content']}>
          <Textbox content={content} />
        </div>
        )}
    </div>
  );
}

export default function Dropdown({ parts }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className={styles['dropdown-container']}>
      {parts.map((part, i) => (
        <DropdownComponent
          key={part.title}
          title={part.title}
          content={part.content}
          open={i === open}
          setOpen={() => { setOpen(i === open ? -1 : i); }}
        />
      ))}
    </div>
  );
}

Dropdown.propTypes = {
  parts: PropTypes.array.isRequired,
};

DropdownComponent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
