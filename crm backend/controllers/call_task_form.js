const calltask_form=require('../models/call_task_form')

const call_task_form=async(req,res)=>
    {
        try {
            const{activity_type,reason,lead,executive,remarks,remind_me,complete,due_date}=req.body;
                const newcalltaskform=new calltask_form({activity_type,reason,lead,executive,remarks,remind_me,complete,due_date})
                    const resp=await newcalltaskform.save(); 
                    res.status(200).send({message:"call task details saved",calltask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    module.exports=call_task_form;
    