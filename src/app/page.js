// Import your styles
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title1}>Welcome to My Next.js Page</h1>
      <p className={styles.description}>
        This is a basic starter template for a Next.js page.
      </p>
    </main>
  );
}
