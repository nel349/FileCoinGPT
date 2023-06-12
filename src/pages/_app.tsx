import '../styles/globals.css';
import React from 'react';

export default function App({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return <div className="bg-gray-800"><Component {...pageProps} /></div>;
}
