import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/* if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker Registrado'))
      .catch(err => console.error('Error al registrar SW:', err))
  })
} */

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <App />
);