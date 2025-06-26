// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  autoConnect: false, // we'll connect manually
  transports: ['websocket'], // optional: forces WebSocket for stability
});

export default socket;
