'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ClassIcon from '@mui/icons-material/Class';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Button from '@mui/material/Button';
import { useSession, signOut } from 'next-auth/react';
import styles from './navbar.module.css';

function NavLink({
  href,
  children,
  icon,
  isActive,
  setCurrentPath,
  currentPath,
}) {
  return (
    <Link
      href={href}
      onClick={() => setCurrentPath(href)}
      style={{ textDecoration: 'none' }}
    >
      <div
        className={`${styles.link} ${isActive ? styles.active : ''}`}
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
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log('data', data);
    setUser(data.user);
    console.log('user', user);
  };
  useEffect(() => {
    console.log('session', session);
    if (session) getUserDetails(session.user.id);
  }, [session]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  return (
    <div
      id="navbar"
      className={`${styles.navbar}`}
      style={{
        display:
          currentPath === '/login'
          || currentPath === '/signup'
          || currentPath === '/verifyemail'
          || currentPath === '/forgot-password'
            ? 'none'
            : 'flex',
      }}
    >
      <div className={styles.navcomp}>
        <div
          className={`${styles.navlinks} ${
            currentPath === '/courses'
          }`}
        >
          <div className={styles.ggLogoAndText}>
            <NavLink
              href="/landing"
              icon={(
                <Image
                  width={
                    47
                  }
                  height={
                   47
                  }
                  alt="gg Logo"
                  src="https://global-green-2.s3.us-west-1.amazonaws.com/globalgreenlogo.png"
                />
              )}
              isActive={currentPath === '/'}
              setCurrentPath={setCurrentPath}
              currentPath={currentPath}
            >
              Global Green Scholar
            </NavLink>
          </div>
          {navlinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              isActive={currentPath === link.href}
              setCurrentPath={setCurrentPath}
              currentPath={currentPath}
            >
              {/* {link.text} */}
              <p>{link.text}</p>
            </NavLink>
          ))}
        </div>
        <div
          className={`${styles.GGScholar}`}
        />
        <div
          className={`${styles.profileWrapper} `}
        >
          <div className={styles.personIcon}>
            {user.profilePic ? (
              <Image
                src={user.profilePic}
                alt="pointsIcon"
                width={64}
                height={64}
              />
            ) : (
              <PersonOutlinedIcon />
            )}
          </div>
          <div className={styles.profileText}>
            <div className={styles.usernameText}>
              {user.userName || 'Login'}
            </div>
            <div className={styles.profilePoints}>
              <Image
                src="https://global-green-2.s3.us-west-1.amazonaws.com/pointsIcon.svg"
                alt="pointsIcon"
                width={16}
                height={16}
              />
              {user.points}
              {' Points'}
            </div>
          </div>
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
