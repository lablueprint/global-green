import Draggable from 'react-draggable';
import React from 'react';

export default function DragDrop() {
  return (
    <div>
      <h3>GeeksforGeeks - Draggable Components</h3>
      <Draggable>
        <div>We can move this text</div>
      </Draggable>
    </div>
  );
}
