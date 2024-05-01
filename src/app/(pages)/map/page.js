import MapComponent from './MapComponent';
import styles from './map.module.css';

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.exampleText}>Map!</div>
      <div className={styles.mainBox}>
        <div className={styles.mapContainer}>
          <MapComponent />
        </div>
        <div className={styles.sideBar}>
          {/* Placeholder for the sidebar content */}
        </div>
      </div>
    </div>
  );
}