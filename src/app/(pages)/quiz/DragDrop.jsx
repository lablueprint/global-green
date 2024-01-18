import React, { useState, useEffect } from 'react';

function DragDrop({
  prompt, options,
}) {
  const [selected, setSelected] = useState(-1);
  const [selectedBucket, setSelectedBucket] = useState(-1);
  const [mousePos, setMousePos] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [delta, setDelta] = useState([0, 0]);
  //   console.log(selected);
  console.log(selectedBucket);

  return (
    <div
      onMouseMove={(e) => {
        if (!draggable) return;
        const diffX = 2100 * (e.clientX - mousePos[0]) / document.documentElement.clientWidth;
        const diffY = 3700 * (e.clientY - mousePos[1]) / document.documentElement.clientHeight;
        setDelta([diffX, diffY]);
      }}
      onMouseUp={(e) => {
        console.log('released');
        // check if selected bucket is non null
      }}
      style={{ padding: 100, width: '100%', height: '100%' }}
    >
      <p>{prompt}</p>
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            margin: '5px',
            padding: '10px 10px',
            border: '1px solid black',
          }}
          onMouseEnter={(e) => {
            if (!draggable) return;
            setSelectedBucket(index);
          }}
          // make sure buckets have margin between them
          onMouseLeave={(e) => {
            if (!draggable) return;
            setSelectedBucket(null);
          }}
        >
          {option.question}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 5 }}>
        {options.map((option, index) => (
          <div
            key={index}
            style={selected === index ? { backgroundColor: 'red', transition: 'none', transform: `translateX(${delta[0]}%) translateY(${delta[1]}%)` }
              : { backgroundColor: 'blue' }}
            onMouseDown={(e) => {
              setSelected(index);
              setMousePos([e.clientX, e.clientY]);
              setDraggable(true);
            }}
          >

            {option.answer}
          </div>
        ))}
      </div>
    </div>

  );
}

export default DragDrop;

// on mouse down for clicking
// state variables -> dragging phase, current card
// print out e
// when release, check if mouse is on top of box
// set draggalbe false when mouse up
// move the card to follow mouse (chatgpt)
// snap back to original position if not in right spot (store original)

// how to do
// get x and y deltas
// define style of the card with transform: "translateX"

// mouseDown -> store initial position, set dragging to true
// mouseMove -> get mouse delta for x and y, update card position
// using style variables
// mouse Up -> check if mouse is above a bucket -> set the cards position to bucket's position
