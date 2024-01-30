'use client';
import React from 'react';
import Link from 'next/link';
import styles from "./navbar.module.css"

export default function NavBar() {
    return (
    <div className={styles.navbar}>
        <div className={styles.navcomp}>
            <Link href= "/"> GG Scholar </Link>
            <Link href= "/courses"> Courses </Link>
            <Link href= "/challenges"> Challenges </Link>
            <Link href="/map"> Map </Link>
            <Link href="/store"> Store</Link>
            <Link href= "/profile"> Profile </Link>
        </div>
    </div>
  );
}
