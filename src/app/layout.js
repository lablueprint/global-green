import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react';
import SessionProvider from './components/SessionProvider';
import NavBar from './components/navbar';
import styles from './page.module.css';
import Loading from './(pages)/loading';

/* eslint react/prop-types: 0 */

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Global Green Web App',
  description: 'Web-based educational game',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <SessionProvider session={session}>
          <div className={styles.wrapper}>
            <NavBar />
            <div
              style={{ minWidth: '80vw' }} // TODO: I feel like we should include this? - Ryan K [OK this is good]
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
