/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

const DATA_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY = process.env.EXAMPLE_API_KEY;

// example CRUD operations
export async function GET() {
  const res = await fetch(DATA_URL);
  const todos = await res.json();
  return NextResponse.json(todos);
}

export async function POST(request) {
  const { userId, title } = await request.json();

  if (!userId || !title) {
    return NextResponse.json({ message: 'missing required data!' });
  }

  const res = await fetch(DATA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({
      userId, title, completed: false,
    }),
  });

  const newTodo = await res.json();
  return NextResponse.json(newTodo);
}

export async function PUT(request) {
  const {
    userId, id, title, completed,
  } = await request.json();

  if (!userId || !title || !title || typeof (completed) !== 'boolean') {
    return NextResponse.json({ message: 'missing required data!' });
  }

  const res = await fetch(`${DATA_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({
      userId, title, completed,
    }),
  });

  const updatedTodo = await res.json();
  return NextResponse.json(updatedTodo);
}

export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'id required' });
  }

  await fetch(`${DATA_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
  });

  return NextResponse.json({ message: `todo ${id} deleted` });
}
