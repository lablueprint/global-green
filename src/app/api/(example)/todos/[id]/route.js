/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

const DATA_URL = 'https://jsonplaceholder.typicode.com/todos';

// example CRUD operations
export async function GET(request, { params: { id } }) {
  const res = await fetch(`${DATA_URL}/${id}`);
  const todo = await res.json();

  if (!todo.id) {
    return NextResponse.json({ message: 'todo not found!' });
  }

  return NextResponse.json(todo);
}
