const addactivity = require("../models/activity");





const add_activity = async (req, res) => {
    try {
        const {activity_name, call_outcome, activity_note,lead} = req.body;

        // Create a new contact with the uploaded Cloudinary URLs
        const newaddactivity = new addactivity({activity_name, call_outcome, activity_note,lead});

        // Save to database
        const resp = await newaddactivity.save();
        res.status(200).send({ message: "activity saved", activity: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving contact", error });
    }
};

const view_activity=async(req,res)=>
    {
        try {
            const resp=await addactivity.find()
            res.status(200).send({message:"activity details fetch successfully",activity:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const remove_activity=async(req,res)=>
        {
            try {
                const _id=req.params._id;
                const user=await addactivity.find({_id:_id})
                if(!user)
                    {
                        return res.send({message:"activity not found"})
                    }
                const resp=await addactivity.deleteOne({_id:_id})
                res.status(200).send({message:"activity deleted successfully"})
            } catch (error) {
                console.log(error)
            }
        }
    

module.exports={add_activity,view_activity,remove_activity}