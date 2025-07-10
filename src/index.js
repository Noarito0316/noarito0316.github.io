import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const script = document.createElement('script');
script.src = 'https://www.instagram.com/embed.js';
script.async = true;
document.body.appendChild(script);


root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="268805329442-6t61hsebn0oajep7s43qph0r4q00ho9n.apps.googleusercontent.com">
        <UserProvider>
          <App/>
        </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
