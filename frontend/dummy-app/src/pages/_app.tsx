import type { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
    
  );
}