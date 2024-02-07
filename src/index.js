import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./fonts/TESLA.ttf"
import ReactGA from 'react-ga';
ReactGA.initialize('G-Y38T7CPZ67');
ReactGA.pageview(window.location.pathname + window.location.search);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
