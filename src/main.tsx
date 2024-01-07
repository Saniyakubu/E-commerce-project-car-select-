import React from 'react';
import ReactDOM from 'react-dom/client';
import CarsContextProvider from './Store/index.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarsContextProvider>
      <App />
    </CarsContextProvider>
  </React.StrictMode>
);
