import MapComponent from './MapComponent';
import styles from './map.module.css';

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sustainability Map</h1>
      <div className={styles.exampleText}>Some kind of description giving a brief overview of what sustainability labs and recycling centers are, along with their impact.</div>
      <div className={styles.mainBox}>
        {/* <div className={styles.mapContainer}> */}
          <MapComponent />
        {/* </div> */}
        {/* <div className={styles.sideBar}> */}
          
          {/* Placeholder for the sidebar content */}
        {/* </div> */}
      </div>
    </div>
  );
}