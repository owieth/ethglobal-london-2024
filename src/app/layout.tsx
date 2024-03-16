import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { WalletProvider } from './wallet-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Waloot',
  description:
    'Payment gateway that combines web2 with web3, made for everyone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen items-center justify-center`}
      >
        <WalletProvider>{children}</WalletProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
