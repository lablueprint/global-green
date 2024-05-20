import MapComponent from './MapComponent';
import styles from './map.module.css';

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sustainability Map</h1>
        <div className={styles.exampleText}>
          Some kind of description giving a brief overview of what sustainability labs and recycling centers are, along with their impact.
        </div>
      </div>
      <MapComponent />
    </div>
  );
}
