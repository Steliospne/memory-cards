import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { GlobalDataProvider } from '@/context/global-context';
import BackgroundVideo from '@/components/background-video';
import Settings from '@/components/layout/settings';

const frizQuadrata = localFont({
  src: '../fonts/Friz_Quadrata_Regular.ttf',
  variable: '--font-fritz-quadrata',
});
export const metadata: Metadata = {
  title: 'Memory Cards',
  description: 'League of legends themed memory card game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${frizQuadrata.variable} relative overflow-hidden antialiased`}
      >
        <GlobalDataProvider>
          {children}
          <Settings />
        </GlobalDataProvider>
        <BackgroundVideo />
      </body>
    </html>
  );
}
