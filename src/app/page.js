// Import necessary components
import Link from 'next/link';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title1}>Welcome to Global Green</h1>
      <p className={styles.description}>
        You should not be seeing this page. Go to /landing
      </p>
    </main>
  );
}
