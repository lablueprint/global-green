// pages/roadmap/roadmap.jsx
import React from 'react';

function Roadmap({ title, steps }) {
  if (!Array.isArray(steps)) {
    console.error('Roadmap component expects "steps" to be an array');
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ alignSelf: 'flex-start', margin: '20px', marginBottom: '-40px' }}>
        <p> Courses &gt; {title}</p>
      </div>
      <div style={{ alignSelf: 'flex-start', margin: '20px' }}>
        <h1> {title} </h1>
      </div>

      {steps.map((step, index) => (
        <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: step.completed ? '#76c893' : '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: step.completed ? 'white' : 'black',
              fontWeight: 'bold',
              position: 'relative',
              margin: '20px 0',
            }}
          >
            {step.completed ? '✓' : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                height: '50px',
                width: '2px',
                backgroundColor: '#ddd',
                alignSelf: 'center',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Roadmap;
