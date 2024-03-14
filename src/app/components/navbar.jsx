'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ClassIcon from '@mui/icons-material/Class';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

import { useSession, signOut } from 'next-auth/react';
import styles from './navbar.module.css';

function NavLink({
  href, children, icon, isActive, setCurrentPath, currentPath,
}) {
  return (
    <Link
      href={href}
      onClick={() => setCurrentPath(href)}
      style={{ textDecoration: 'none' }}
    >
      <div
        className={`${styles.link} ${isActive ? styles.active : ''} ${currentPath === '/courses' ? styles.mini : ''}`}

      >
        {icon}
        {children}
      </div>
    </Link>
  );
}

export default function NavBar() {
  const [currentPath, setCurrentPath] = useState('');
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  const navlinks = [
    {
      href: '/landing',
      text: 'Courses',
      icon: <ClassIcon />,
    },
    {
      href: '/challenges',
      text: 'Challenges',
      icon: <FlagOutlinedIcon />,
    },
    {
      href: '/store',
      text: 'Store',
      icon: <ShoppingBagOutlinedIcon />,
    },
    {
      href: '/profile',
      text: 'Profile',
      icon: <PersonOutlinedIcon />,
    },
    {
      href: '/map',
      text: 'Map',
      icon: <LocationOnOutlinedIcon />,
    },

  ];
  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch(
      '/api/users/me',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );

    const data = await response.json();
    console.log('data', data);
    setUser(data.user);
  };

  useEffect(() => {
    if (session) getUserDetails(session.user.id);
  }, [session]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div className={`${styles.navbar} ${currentPath === '/courses' ? styles.mini : ''}`}>
      <div className={styles.navcomp}>
        <div className={`${styles.profileWrapper} ${currentPath === '/courses' ? styles.mini : ''}`}>
          <div className={styles.personIcon}>
            <PersonOutlinedIcon />

          </div>
          {
            currentPath === '/courses' ? ''
              : (
                <div className={styles.profileText}>
                  {user.userName || 'Login'}
                </div>
              )
}
          <div className={styles.profilePoints}>
            <TollOutlinedIcon />
            164
            {' '}
            {currentPath === '/courses' ? '' : 'Points'}
          </div>

        </div>
        <div className={`${styles.navlinks} ${currentPath === '/courses' ? styles.mini : ''}`}>
          {navlinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              isActive={currentPath === link.href}
              setCurrentPath={setCurrentPath}
              currentPath={currentPath}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div className={`${styles.GGScholar} ${currentPath === '/courses' ? styles.mini : ''}`}>

          <NavLink
            href="/"
            icon={<PublicOutlinedIcon />}
            isActive={currentPath === '/'}
            setCurrentPath={setCurrentPath}
            currentPath={currentPath}
          >
            {currentPath === '/courses' ? '' : 'GG Scholar'}
          </NavLink>
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
