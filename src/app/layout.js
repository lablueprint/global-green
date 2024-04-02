import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import NavBar from './components/navbar';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Global Green Web App',
  description: 'Web-based educational game',
};

/* eslint react/prop-types: 0 */
export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className={styles.wrapper}>
            <NavBar />
            <div>
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
