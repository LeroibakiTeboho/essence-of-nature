import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Baccarat Rouge 540 · Essence of Nature',
  description: 'Discover the Baccarat Rouge 540 collection – where nature meets excellence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}