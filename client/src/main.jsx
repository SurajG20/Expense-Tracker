import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import { GlobalStyle } from './styles/GlobalStyle.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './app/Store';
import { Provider } from 'react-redux';
import { persistor } from './app/Store';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
