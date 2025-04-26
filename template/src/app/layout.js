import { Inter } from 'next/font/google';
import AuthProvider from './components/AuthProvider';
import ThemeRegistry from './components/ThemeRegistry';
import dynamic from 'next/dynamic';

const LayoutWithNavClient = dynamic(() => import('./components/LayoutWithNavClient'), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MongoNext App',
  description: 'Next.js application with MongoDB Atlas integration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className={inter.className}>
        <AuthProvider>
          <ThemeRegistry>
            <LayoutWithNavClient>{children}</LayoutWithNavClient>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
} 