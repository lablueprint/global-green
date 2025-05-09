'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import MapComponent from './MapComponent';
import styles from './map.module.css';
import ChallengeBadge from '@/app/components/snackBar';

export default function Page() {
  const [visitMapBadge, setVisitMapBadge] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) getUserDetails(session.user.id);
  }, [session]);

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

    if (data.user.badges) {
      const badge = data.user.badges.find((badge) => badge.key === 'EcoExplorer');
      if (!badge) {
        const response = await fetch('/api/users/me/add-badge', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: data.user._id,
            badge: 'EcoExplorer',
          }),
        });
        const res = await response.json();
        console.log('res', res);
        setVisitMapBadge(true);
      }
    }
  };

  return (
    <>
      <ChallengeBadge
        challengeName="Eco Explorer"
        challengePointValue="10"
        open={visitMapBadge}
        handleClose={() => setVisitMapBadge(false)}
      />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sustainability Map</h1>
          <div className={styles.exampleText}>
            Explore Global Green Journey’s various Sustainability Lab locations
            across the world.
          </div>
        </div>
        <MapComponent />
      </div>
    </>
  );
}
