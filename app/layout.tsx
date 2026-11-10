import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'AppHosp', description: 'Healthcare appointments made simpler.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
