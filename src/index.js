import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const root = ReactDOM.createRoot(document.getElementById('root'));

const ws_client = new W3CWebSocket('ws://justagiraffe.us:3001')
root.render(
  <React.StrictMode>
    <App client={ws_client} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
