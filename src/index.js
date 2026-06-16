import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Website from './Website';
import './index.css';

const Root = () => {
  const [screen, setScreen] = useState('website');
  const [appInitial, setAppInitial] = useState('home');

  const exit = () => setScreen('website');

  if (screen === 'app') {
    return <App initialView={appInitial} onExit={exit} />;
  }

  return (
    <Website
      onStartSession={() => { setAppInitial('assessment'); setScreen('app'); }}
      onOpenApp={() => { setAppInitial('home'); setScreen('app'); }}
    />
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
