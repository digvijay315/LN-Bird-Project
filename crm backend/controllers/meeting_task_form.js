const meetingtask_form=require('../models/meeting_task_form')

const meeting_task_form=async(req,res)=>
    {
        try {
            const{activity_type,title,executive,lead,location_type,location_address,reason,project,inventory,remarks,complete,due_date,
                title2,first_name,last_name,mobile_no,email,stage}=req.body;

                const newmeetingtaskform=new meetingtask_form({activity_type,title,executive,lead,location_type,location_address,
                                    reason,project,inventory,remarks,complete,due_date,title2,first_name,last_name,mobile_no,email,stage})
                    const resp=await newmeetingtaskform.save(); 
                    res.status(200).send({message:"meeting task details saved",meetingtask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    const viewmeeting_task=async(req,res)=>
        {
            try {
                const resp= await meetingtask_form.find()
    
                  
                        res.status(200).send({message:"meeting task details ",meetingtask:resp})
            } catch (error) {
                console.log(error)
            }
    
        }
    module.exports={meeting_task_form,viewmeeting_task};
    