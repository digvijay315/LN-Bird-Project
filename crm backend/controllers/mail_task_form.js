const mailtask_form=require('../models/mail_task_form')

const mail_task_form=async(req,res)=>
    {
        try {
            const{activity_type,executive,lead,inventory,subject,remarks,remind_me,complete,due_date}=req.body;
                
                
                const newmailtaskform=new mailtask_form({activity_type,executive,lead,inventory,subject,remarks,remind_me,complete,due_date})
                
                    const resp=await newmailtaskform.save(); 
                    res.status(200).send({message:"mail task details saved",mailtask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    module.exports=mail_task_form;
    