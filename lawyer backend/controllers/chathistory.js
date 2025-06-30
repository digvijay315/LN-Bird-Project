
const Message = require('../models/chathistory'); // Adjust path if needed


const getchathistory=async(req,res)=>
{
   try {
     const { user1Id, user2Id } = req.params;

    const messages = await Message.find({
      $or: [
        { from: user1Id, to: user2Id },
        { from: user2Id, to: user1Id },
      ],
    }).sort({ timestamp: 1 }); // oldest first

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch messages' });
    console.log(error);
    
  }
}

module.exports=getchathistory