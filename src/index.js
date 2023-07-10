import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Modal from 'react-modal';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
