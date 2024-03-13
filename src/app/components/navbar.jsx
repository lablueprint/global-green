'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import styles from './navbar.module.css';

export default function NavBar() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  function NavLink({ href, children }) {
    return (
      <Link href={href}>
        <span className={`${styles.link} ${(currentPath === href && currentPath !== '/') ? styles.active : ''}`}>
          {children}
        </span>
      </Link>
    );
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navcomp}>
        <div className={styles.personIcon}>
          <PersonOutlinedIcon style={{ justifySelf: 'center', position: 'fixed' }} />
        </div>
        <NavLink href="/" style={{ textDecoration: 'none' }} className={`${styles.link} ${styles.GGScholar}`}>GG Scholar</NavLink>
        <NavLink href="/landing" style={{ textDecoration: 'none' }} className={styles.link}>Courses</NavLink>
        <NavLink href="/challenges" style={{ textDecoration: 'none' }} className={styles.link}>Challenges</NavLink>
        <NavLink href="/store" style={{ textDecoration: 'none' }} className={styles.link}>Store</NavLink>
        <div className={styles.navBottom}>
          <NavLink href="/map" style={{ textDecoration: 'none' }} className={styles.link}>Map</NavLink>
          <NavLink href="/profile" style={{ textDecoration: 'none' }} className={styles.link}>Profile</NavLink>
        </div>
      </div>
    </div>
  );
}

/* return (
    <div className={styles.navbar}>
        <div className={styles.navcomp}>
            <NavLink href="/" style={{ textDecoration: 'none' }} className={styles.GGScholar}>GG Scholar</NavLink>
            <NavLink href= "/courses" style={{ textDecoration: 'none'}}>Courses</NavLink>
            <NavLink href= "/challenges" style={{ textDecoration: 'none'}}>Challenges</NavLink>
            <NavLink href="/map" style={{ textDecoration: 'none'}} >Map</NavLink>
            <NavLink href="/store" style={{ textDecoration: 'none'}} >Store</NavLink>
            <NavLink href= "/profile" style={{ textDecoration: 'none'}} >Profile</NavLink>
        </div>
    </div>
  );
} */
