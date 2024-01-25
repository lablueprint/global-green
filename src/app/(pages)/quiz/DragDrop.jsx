import Draggable from 'react-draggable';
import React, { useState, useEffect } from 'react';

export default function DragDrop({ prompt, options }) {
  return (
    <div>
      <h3>GeeksforGeeks - Draggable Components</h3>
      <p>{prompt}</p>
      {options.map((option, index) => (
        <div
          style={{ display: 'flex' }}
        >
          <div
            style={{
              margin: '5px',
              width: '40%',
              padding: '10px 10px',
              border: '1px solid black',
            }}
          >
            this is the answer box

          </div>
          <div
            key={index}
            style={{
              margin: '5px',
              width: '40%',
              padding: '10px 10px',
              border: '1px solid black',
            }}
          >
            {option.question}
          </div>
        </div>

      ))}
      <div style={{ display: 'flex', gap: 5 }}>
        {options.map((option, index) => (
          <Draggable>
            <div
              key={index}
              style={{
                margin: '5px',
                padding: '10px 10px',
                border: '1px solid black',
              }}
            >

              {option.answer}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
