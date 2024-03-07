// Import necessary components
import Link from 'next/link';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title1}>Welcome to My Next.js Page</h1>
      <p className={styles.description}>
        This is a basic starter template for a Next.js page.
      </p>

      {/* <Link href="/quiz"> */}
        {/* <a className={styles.button}>Go to Quiz Page</a> Style this as needed */}
      {/* </Link> */}
    </main>
  );
}
