import { Inter } from 'next/font/google';
import NavBar from './components/navbar';
import './globals.css';
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Global Green Web App',
  description: 'Web-based educational game',
};

/* eslint react/prop-types: 0 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <div className={styles.wrapper}>
            <NavBar />
            <div>
              {children}
            </div>
          </div>
        </body>
    </html>
  );
}
