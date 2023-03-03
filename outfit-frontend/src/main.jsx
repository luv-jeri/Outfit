import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/Auth.context';
import axios from 'axios';
import { NotificationProvider } from './wrappers/notification/Notification.wrapper';
import { Provider } from 'react-redux';
import ErrorBoundary from './wrappers/error_boundary/ErrorBoundary';
import store from './store';
axios.defaults.baseURL = 'http://localhost:9100/api/v1/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <NotificationProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </NotificationProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
