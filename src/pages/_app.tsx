import '../styles/globals.css';
import '../styles/components/DynamicInterfaceComponentStyles.css';

import React from 'react';
export default class App extends React.Component<{ Component: React.ElementType, pageProps: any }> {

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/saturn-sw.js');
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return <div className="bg-gray-800"><Component {...pageProps} /></div>;
  }
}
