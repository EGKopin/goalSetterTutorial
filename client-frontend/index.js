import React from 'react';
import App from './App.jsx';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import './index.css'
// import 'react-toastify/dist/ReactToastify.css'


const app = createRoot(document.getElementById('root'));

app.render(
    <Provider store={store}>
     <App />
    </Provider>
    );