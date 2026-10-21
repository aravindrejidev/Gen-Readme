import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import Navbar from './components/Navbar';

const font = Space_Grotesk({ subsets: ['latin'] });

export const metadata = {
  title: 'README Forge - GitHub Profile README Generator',
  description: 'Build a GitHub profile README from your phone and copy it in one tap.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} min-h-screen bg-[#0B0B0B] text-white antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
