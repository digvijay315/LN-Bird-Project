const calltask_form=require('../models/call_task_form')

const call_task_form=async(req,res)=>
    {
        try {
            const{activity_type,title,reason,lead,executive,remarks,complete,due_date,title2,first_name,last_name,mobile_no,email,stage}=req.body;
                const newcalltaskform=new calltask_form({activity_type,title,reason,lead,executive,remarks,complete,due_date,
                    title2,first_name,last_name,mobile_no,email,stage
                })
                    const resp=await newcalltaskform.save(); 
                    res.status(200).send({message:"call task details saved",calltask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    
    const view_call=async(req,res)=>
        {
            try {
                const resp=await calltask_form.find()
                res.status(200).send({message:"call details fetch successfully",call_task:resp})
            } catch (error) {
                console.log(error)
            }
        }
    module.exports={call_task_form,view_call};
    