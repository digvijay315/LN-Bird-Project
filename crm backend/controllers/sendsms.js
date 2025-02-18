

const twilio=require('twilio')

const accountSid = "AC18ffab636fbe7ad0dab0a7bd48e2150f";
const authToken = "abad644377d556f04c5e9f3a4b5ae6a9";
const client = twilio(accountSid, authToken);

const sendmessage=async(req,res)=>
{
    try {
        console.log(req.body);
        
        const { to, message } = req.body;

    const resp = await client.messages.create({
      body: message,
      from: +19062561113, // Your Twilio number
      to: to, // Receiver's phone number
    });
    res.status(200).send({message:"message send successfully",resp})
        
    } catch (error) {
        console.log(error);
        
    }
}

const makecall=async(req,res)=>
    {
        try {
            console.log(req.body);
            
            const { to} = req.body;
    
            const resp = await client.calls.create({
                url: "http://demo.twilio.com/docs/voice.xml",
                to: to,
                from: +19062561113, // Your Twilio phone number
              });
        res.status(200).send({message:"message send successfully",resp})
            
        } catch (error) {
            console.log(error);
            
        }
    }

module.exports={sendmessage,makecall}