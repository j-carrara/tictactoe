import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const root = ReactDOM.createRoot(document.getElementById('root'));

const ws_client = new W3CWebSocket('ws://justagiraffe.us:3001')
root.render(
  <React.StrictMode>
    <App client={ws_client} />
  </React.StrictMode>
);