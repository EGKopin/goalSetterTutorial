import React from 'react';
import App from './App.jsx';
// import { store } from './app/store';
// import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'

const app = createRoot(document.getElementById('root'));

app.render(
    <App />
    );