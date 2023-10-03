import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GlobalStyle } from './styles/GlobalStyle.js';
import { GlobalProvider } from './context/globalContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </GlobalProvider>
  </React.StrictMode>
);
