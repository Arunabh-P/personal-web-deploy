/* eslint-disable new-cap */
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import '../../styles/typography.css';
import ProvidersWrapper from '../provider';
import { WebVitals } from '../../../reportWebVitals';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Arunabh | personal Website',
  description: 'My personal website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${roboto.variable}`}>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} antialiased`}
      >
        <WebVitals />
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
