
const Message = require('../models/chathistory'); // Adjust path if needed


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
   socket.on('privateMessage', async ({ toUserId, message, fromUserType, fileUrl, fileName, fileType }) => {
  let receiverSocketId;
  let fromModel, toModel;

  if (fromUserType === 'client') {
    receiverSocketId = onlineLawyers[toUserId];
    fromModel = 'User';
    toModel = 'Lawyer';
  } else if (fromUserType === 'lawyer') {
    receiverSocketId = onlineClients[toUserId];
    fromModel = 'Lawyer';
    toModel = 'User';
  }

  const fromUserId = socket.userId;

  console.log(`📨 Private message from ${fromUserId} to ${toUserId}`);

  // Send to receiver if online
 if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', {
          from: fromUserId,
          message,
          fileUrl,
          fileName,
          fileType
        });
      }

  // ✅ Save message to DB
  try {
    await Message.create({
          from: fromUserId,
          fromModel,
          to: toUserId,
          toModel,
          message,
          fileUrl,
          fileName,
          fileType
        });
    console.log('💾 Message saved to DB');
  } catch (err) {
    console.error('❌ Error saving message to DB:', err);
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


