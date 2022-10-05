import App from './App';
// import { store } from './app/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'

const app = createRoot(document.getElementById('root'));

app.render(
    <App />
    );