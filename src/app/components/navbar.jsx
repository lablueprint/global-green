'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ClassIcon from '@mui/icons-material/Class';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useSession, signOut } from 'next-auth/react';
import styles from './navbar.module.css';

function NavLink({ href, children, icon, isActive, setCurrentPath }) {
  return (
    <Link
      href={href}
      onClick={() => setCurrentPath(href)}
      style={{ textDecoration: 'none' }}
    >
      <div className={`${styles.link} ${isActive ? styles.active : ''}`}>
        {icon}
        {children}
      </div>
    </Link>
  );
}

export default function NavBar() {
  const [currentPath, setCurrentPath] = useState('');
  const { data: session, status } = useSession();
  const [user, setUser] = useState({ userName: 'User', seeds: 0 });
  const [shouldRenderNav, setShouldRenderNav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

    try {
      setIsLoading(true);
      const response = await fetch('/api/users/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('data', data);
      setUser({
        ...data.user,
        userName: data.user.userName || 'User',
        seeds: data.user.seeds || 0,
      });
      console.log('user', user);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('session', session);
    if (status === 'authenticated' && session?.user?.id) {
      console.log('nav session authenticated');
      getUserDetails(session.user.id);
    }
  }, [status, session]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      return;
    }

    const updatePathAndNavState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      // Check if path starts with /roadmap/ or /lesson/
      if (
        path.startsWith('/roadmap/') ||
        path.startsWith('/lesson') ||
        path.startsWith('/quiz')
      ) {
        setShouldRenderNav(true);
        return;
      }

      // Other paths where navbar should be rendered
      const pathsToRenderNav = [
        '/landing',
        '/challenges',
        '/store',
        '/profile',
        '/map',
      ];
      setShouldRenderNav(pathsToRenderNav.includes(path));
    };

    updatePathAndNavState(); // initial check

    const handleRouteChange = () => {
      updatePathAndNavState();
    };

    // event listener for route changes
    window.addEventListener('popstate', handleRouteChange);

    // clean up listener on unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.location.pathname.startsWith('/landing')) {
      setShouldRenderNav(true);
      setCurrentPath('/landing');
    }

    // to detect URL changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const newPath = window.location.pathname;
        if (currentPath !== newPath) {
          setCurrentPath(newPath);

          const shouldShow =
            ['/landing', '/challenges', '/store', '/profile', '/map'].includes(
              newPath
            ) ||
            newPath.startsWith('/roadmap/') ||
            newPath.startsWith('/lesson') ||
            newPath.startsWith('/quiz');
          setShouldRenderNav(shouldShow);
        }
      });
    });

    observer.observe(document, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, [currentPath]);

  if (!shouldRenderNav) {
    return null;
  }

  return (
    <div id="navbar" className={`${styles.navbar}`}>
      <div className={styles.navcomp}>
        <div className={`${styles.navlinks} ${currentPath === '/courses'}`}>
          <div className={styles.ggLogoAndText}>
            <NavLink
              href="/landing"
              icon={
                <Image
                  width={47}
                  height={47}
                  alt="gg Logo"
                  src="https://global-green-2.s3.us-west-1.amazonaws.com/globalgreenlogo.png"
                />
              }
              isActive={currentPath === '/'}
              setCurrentPath={setCurrentPath}
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
            >
              <p>{link.text}</p>
            </NavLink>
          ))}
        </div>
        <div className={`${styles.GGScholar}`} />
        <div className={`${styles.profileWrapper} `}>
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
              {isLoading ? 'User' : user.userName}
            </div>
            <div className={styles.profilePoints}>
              <Image
                src="https://global-green-2.s3.us-west-1.amazonaws.com/pointsIcon.svg"
                alt="pointsIcon"
                width={16}
                height={16}
              />
              {isLoading ? '...' : user.seeds}
              {' Points'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
