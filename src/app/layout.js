import './globals.css';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { getSelectorsByUserAgent } from 'react-device-detect';
import React, { Suspense } from 'react';
import SessionProvider from './components/SessionProvider';
import NavBar from './components/navbar';
import styles from './page.module.css';
import Loading from './(pages)/loading';
/* eslint react/prop-types: 0 */

export const metadata = {
  title: 'Global Green Web App',
  description: 'Web-based educational game',
};
export default async function RootLayout({ children }) {
  const session = await getServerSession();
  const { isMobile } = getSelectorsByUserAgent(
    headers().get('user-agent'),
  );
  if (isMobile) {
    return (
      <html lang="en">
        <body>
          <div className={styles.error}>
            <h1>Unsupported Device</h1>
            <p>This application is not supported on mobile devices. Please use a web browser on a desktop or laptop.</p>
          </div>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <SessionProvider session={session}>
          <div className={styles.wrapper}>
            <NavBar />
            <div
              style={{ minWidth: '80vw' }}
            >
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
