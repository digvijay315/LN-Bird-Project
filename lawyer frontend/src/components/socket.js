// socket.js
import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//   autoConnect: false, // important: don't auto-connect immediately
// });

const socket = io('https://ln-bird-project.onrender.com', {
  autoConnect: false, // important: don't auto-connect immediately
});

export default socket;
