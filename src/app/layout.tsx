import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Layout, Toaster } from 'components';

import 'styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Melhor Celular',
  description: 'Sistema de cadastro de celulares',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
