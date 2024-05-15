'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

function CoursesIndexPage() {
  const router = useRouter();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '100px',
  };

  const headerStyle = {
    fontSize: '2em',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    marginBottom: '40px',
  };

  const courseHeaderStyle = {
    fontSize: '1.5em',
    marginBottom: '10px',
  };

  const buttonStyle = {
    marginRight: '10px',
    marginBottom: '5px',
    padding: '10px 20px',
    fontSize: '1em',
    backgroundColor: '#519546',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Courses</h1>
      <h1 style={headerStyle}>designers lmk whats wrong with each lesson so i can fix :0</h1>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <h2 style={courseHeaderStyle}>Course 1</h2>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_1/introduction')}>Course 1: Introduction</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_1/lesson_1')}>Course 1: Lesson 1</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_1/lesson_2')}>Course 1: Lesson 2</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_1/lesson_3')}>Course 1: Lesson 3</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_1/lesson_4')}>Course 1: Lesson 4</button>
        </li>
        <li style={listItemStyle}>
          <h2 style={courseHeaderStyle}>Course 2</h2>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_2/introduction')}>Course 2: Introduction</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_2/lesson_1')}>Course 2: Lesson 1</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_2/lesson_2')}>Course 2: Lesson 2</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_2/lesson_3')}>Course 2: Lesson 3</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_2/lesson_4')}>Course 2: Lesson 4</button>
        </li>
        <li style={listItemStyle}>
          <h2 style={courseHeaderStyle}>Course 3</h2>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_3/introduction')}>Course 3: Introduction</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_3/lesson_1')}>Course 3: Lesson 1</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_3/lesson_2')}>Course 3: Lesson 2</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_3/lesson_3')}>Course 3: Lesson 3</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_3/lesson_4')}>Course 3: Lesson 4</button>
        </li>
        <li style={listItemStyle}>
          <h2 style={courseHeaderStyle}>Course 4</h2>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_4/introduction')}>Course 4: Introduction</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_4/lesson_1')}>Course 4: Lesson 1</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_4/lesson_2')}>Course 4: Lesson 2</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_4/lesson_3')}>Course 4: Lesson 3</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_4/lesson_4')}>Course 4: Lesson 4</button>
        </li>
        <li style={listItemStyle}>
          <h2 style={courseHeaderStyle}>Course 5</h2>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_5/introduction')}>Course 5: Introduction</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_5/lesson_1')}>Course 5: Lesson 1</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_5/lesson_2')}>Course 5: Lesson 2</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_5/lesson_3')}>Course 5: Lesson 3</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_5/lesson_4')}>Course 5: Lesson 4</button>
        </li>
        <li style={listItemStyle}>
          <h2 style={courseHeaderStyle}>Course 6</h2>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_6/introduction')}>Course 6: Introduction</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_6/lesson_1')}>Course 6: Lesson 1</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_6/lesson_2')}>Course 6: Lesson 2</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_6/lesson_3')}>Course 6: Lesson 3</button>
          <button type="button" style={buttonStyle} onClick={() => router.push('/courses/course_6/lesson_4')}>Course 6: Lesson 4</button>
        </li>
      </ul>
    </div>
  );
}

export default CoursesIndexPage;
