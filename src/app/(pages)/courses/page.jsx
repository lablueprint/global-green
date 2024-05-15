'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

function CoursesIndexPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '100px' }}>
      <h1>Courses</h1>
      <ul>
        {/* Course 1 */}
        <li>
          <h2>Course 1</h2>
          <button type="button" onClick={() => router.push('/courses/course_1/introduction')}>Course 1: Introduction</button>
          <button type="button" onClick={() => router.push('/courses/course_1/lesson_1')}>Course 1: Lesson 1</button>
          <button type="button" onClick={() => router.push('/courses/course_1/lesson_2')}>Course 1: Lesson 2</button>
          <button type="button" onClick={() => router.push('/courses/course_1/lesson_3')}>Course 1: Lesson 3</button>
          <button type="button" onClick={() => router.push('/courses/course_1/lesson_4')}>Course 1: Lesson 4</button>
        </li>
        {/* Course 2 */}
        <li>
          <h2>Course 2</h2>
          <button type="button" onClick={() => router.push('/courses/course_2/introduction')}>Course 2: Introduction</button>
          <button type="button" onClick={() => router.push('/courses/course_2/lesson_1')}>Course 2: Lesson 1</button>
          <button type="button" onClick={() => router.push('/courses/course_2/lesson_2')}>Course 2: Lesson 2</button>
          <button type="button" onClick={() => router.push('/courses/course_2/lesson_3')}>Course 2: Lesson 3</button>
          <button type="button" onClick={() => router.push('/courses/course_2/lesson_4')}>Course 2: Lesson 4</button>
        </li>
        {/* Course 3 */}
        <li>
          <h2>Course 3</h2>
          <button type="button" onClick={() => router.push('/courses/course_3/introduction')}>Course 3: Introduction</button>
          <button type="button" onClick={() => router.push('/courses/course_3/lesson_1')}>Course 3: Lesson 1</button>
          <button type="button" onClick={() => router.push('/courses/course_3/lesson_2')}>Course 3: Lesson 2</button>
          <button type="button" onClick={() => router.push('/courses/course_3/lesson_3')}>Course 3: Lesson 3</button>
          <button type="button" onClick={() => router.push('/courses/course_3/lesson_4')}>Course 3: Lesson 4</button>
        </li>
        {/* Course 4 */}
        <li>
          <h2>Course 4</h2>
          <button type="button" onClick={() => router.push('/courses/course_4/introduction')}>Course 4: Introduction</button>
          <button type="button" onClick={() => router.push('/courses/course_4/lesson_1')}>Course 4: Lesson 1</button>
          <button type="button" onClick={() => router.push('/courses/course_4/lesson_2')}>Course 4: Lesson 2</button>
          <button type="button" onClick={() => router.push('/courses/course_4/lesson_3')}>Course 4: Lesson 3</button>
          <button type="button" onClick={() => router.push('/courses/course_4/lesson_4')}>Course 4: Lesson 4</button>
        </li>
        {/* Course 5 */}
        <li>
          <h2>Course 5</h2>
          <button type="button" onClick={() => router.push('/courses/course_5/introduction')}>Course 5: Introduction</button>
          <button type="button" onClick={() => router.push('/courses/course_5/lesson_1')}>Course 5: Lesson 1</button>
          <button type="button" onClick={() => router.push('/courses/course_5/lesson_2')}>Course 5: Lesson 2</button>
          <button type="button" onClick={() => router.push('/courses/course_5/lesson_3')}>Course 5: Lesson 3</button>
          <button type="button" onClick={() => router.push('/courses/course_5/lesson_4')}>Course 5: Lesson 4</button>
        </li>
        {/* Course 6 */}
        <li>
          <h2>Course 6</h2>
          <button type="button" onClick={() => router.push('/courses/course_6/introduction')}>Course 6: Introduction</button>
          <button type="button" onClick={() => router.push('/courses/course_6/lesson_1')}>Course 6: Lesson 1</button>
          <button type="button" onClick={() => router.push('/courses/course_6/lesson_2')}>Course 6: Lesson 2</button>
          <button type="button" onClick={() => router.push('/courses/course_6/lesson_3')}>Course 6: Lesson 3</button>
          <button type="button" onClick={() => router.push('/courses/course_6/lesson_4')}>Course 6: Lesson 4</button>
        </li>
      </ul>
    </div>
  );
}

export default CoursesIndexPage;
