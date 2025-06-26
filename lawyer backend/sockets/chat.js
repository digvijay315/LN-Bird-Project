// ./sockets/chat.js

const onlineLawyers = {};

module.exports = (io) => {
      console.log('chat socket connected');
  io.on('connection', (socket) => {
    console.log('🔌 A client connected:', socket.id);

    // Step 1: Lawyer comes online
    socket.on('lawyerOnline', (lawyerId) => {
      socket.lawyerId = lawyerId; // ✅ attach to socket object
      onlineLawyers[lawyerId] = socket.id;
      console.log(`👤 Lawyer ${lawyerId} is online`);
      io.emit('updateOnlineUsers', Object.keys(onlineLawyers)); // broadcast
    });

    // Add this inside `io.on('connection')`
    socket.on('getOnlineLawyers', () => {
      socket.emit('onlineLawyersList', Object.keys(onlineLawyers));
    });


    // Step 2: Socket disconnect
    socket.on('disconnect', () => {
      const lawyerId = socket.lawyerId;
      if (lawyerId && onlineLawyers[lawyerId] === socket.id) {
        delete onlineLawyers[lawyerId];
        console.log(`❌ Lawyer ${lawyerId} disconnected`);
        io.emit('updateOnlineUsers', Object.keys(onlineLawyers));
      } else {
        console.log(`❌ Unknown socket disconnected: ${socket.id}`);
      }
    });

    // 🔁 (Optional) For private chat
    socket.on('privateMessage', ({ toLawyerId, message }) => {
      const receiverSocketId = onlineLawyers[toLawyerId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', {
          from: socket.lawyerId,
          message,
        });
      }
    });
  });
};
