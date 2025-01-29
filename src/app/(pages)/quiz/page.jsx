'use client';

import dynamic from 'next/dynamic';
import Loading from '../loading';

const ClientQuiz = dynamic(() => import('./ClientQuiz'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function QuizPage() {
  return <ClientQuiz />;
}
