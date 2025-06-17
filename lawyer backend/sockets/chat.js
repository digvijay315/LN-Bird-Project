const {
  handleJoinSession,
  handleSendMessage,
  handleStartTimer,
  handleTyping
} = require('../controllers/socketController');

function chatSocket(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // OPTIONAL: JWT authentication middleware
    // io.use((socket, next) => {
    //   const token = socket.handshake.auth?.token;
    //   // Verify token here
    // });

    socket.on('join-session', (data) => handleJoinSession(socket, data));
    socket.on('send-message', (data) => handleSendMessage(io, data));
    socket.on('typing', (data) => handleTyping(socket, data));
    socket.on('start-timer', (data) => handleStartTimer(io, data));

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

module.exports = chatSocket;
