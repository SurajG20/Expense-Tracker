import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import { GlobalStyle } from './styles/GlobalStyle.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from './app/Store';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <GlobalStyle />
      <Router>
        <App />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
