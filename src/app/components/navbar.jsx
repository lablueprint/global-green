'use client';
import React from 'react';
import Link from 'next/link';
import styles from "./navbar.module.css"


export default function NavBar() {
    return (
    <>
    <div {styles.navbar}></div>

        <div className={styles.GG_Scholar}>
    <h1><Link href= "/"> GG Scholar </Link></h1>
        </div>

        <div className={styles.Courses}>
    <h1><Link href= "/courses"> Courses </Link></h1>
        </div>

        <div className={styles.Challenges}>
    <h1><Link href= "/challenges"> Challenges </Link></h1>
        </div>

        <div className={styles.Map}>
            <h1><Link href="/map"> Map </Link></h1>
        </div>

        <div className={styles.Store}>
            <h1><Link href="/store"> Store</Link></h1>
        </div>

        <div className={styles.Profile}>
    <h1>
        <Link href= "/profile"> Profile </Link></h1>
        </div>
    </>
  );
}
