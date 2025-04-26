'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

export default function LayoutWithNavClient({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Navbar />}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
} 