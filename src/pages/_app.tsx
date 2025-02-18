// src/pages/_app.tsx

import '../styles/Globals.css';
import type { AppProps } from 'next/app';
import '../fontawesome';  // Import the Font Awesome configuration

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
