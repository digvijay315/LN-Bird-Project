const onlineLawyers = {};
const onlineClients = {};

module.exports = (io) => {
  console.log('chat socket connected');

  io.on('connection', (socket) => {
    // console.log('🔌 A client connected:', socket.id);

    // Lawyer online
    socket.on('lawyerOnline', (lawyerId) => {
      socket.userType = 'lawyer';
      socket.userId = lawyerId;
      onlineLawyers[lawyerId] = socket.id;
      console.log(`👤 Lawyer ${lawyerId} is online`);
      io.emit('updateOnlineUsers', Object.keys(onlineLawyers));
    });

    // Client online
    socket.on('clientOnline', (clientId) => {
      socket.userType = 'client';
      socket.userId = clientId;
      onlineClients[clientId] = socket.id;
      console.log(`🧑‍💼 Client ${clientId} is online`);
    });

    // Get online lawyers list
    socket.on('getOnlineLawyers', () => {
      socket.emit('onlineLawyersList', Object.keys(onlineLawyers));
    });

    // Private messaging
    socket.on('privateMessage', ({ toUserId, message, fromUserType }) => {
      let receiverSocketId;

      // If sender is client → toUserId is lawyer
      if (fromUserType === 'client') {
        receiverSocketId = onlineLawyers[toUserId];
      } else if (fromUserType === 'lawyer') {
        receiverSocketId = onlineClients[toUserId];
      }

      console.log(`📨 Private message from ${socket.userId} to ${toUserId}`);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', {
          from: socket.userId,
          message,
        });
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      const { userType, userId } = socket;

      if (userType === 'lawyer' && onlineLawyers[userId] === socket.id) {
        delete onlineLawyers[userId];
        io.emit('updateOnlineUsers', Object.keys(onlineLawyers));
        console.log(`❌ Lawyer ${userId} disconnected`);
      } else if (userType === 'client' && onlineClients[userId] === socket.id) {
        delete onlineClients[userId];
        console.log(`❌ Client ${userId} disconnected`);
      } else {
        console.log(`❌ Unknown socket disconnected: ${socket.id}`);
      }
    });
  });
};
