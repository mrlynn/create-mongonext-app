'use client';

import dynamic from 'next/dynamic';

const LayoutWithNavClient = dynamic(() => import('./LayoutWithNavClient'), { ssr: false });

export default function ClientLayoutWrapper({ children }) {
  return <LayoutWithNavClient>{children}</LayoutWithNavClient>;
} 