const mailtask_form=require('../models/mail_task_form')

const mail_task_form=async(req,res)=>
    {
        try {
            const{activity_type,title,executive,lead,inventory,subject,remarks,complete,due_date,title2,first_name,last_name,
                    mobile_no,email,stage}=req.body;
                
                
                const newmailtaskform=new mailtask_form({activity_type,title,executive,lead,inventory,subject,remarks,complete,due_date,
                    title2,first_name,last_name, mobile_no,email,stage })
                
                    const resp=await newmailtaskform.save(); 
                    res.status(200).send({message:"mail task details saved",mailtask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    const view_mail=async(req,res)=>
        {
            try {
                const resp=await mailtask_form.find()
                res.status(200).send({message:"mail details fetch successfully",mail_task:resp})
            } catch (error) {
                console.log(error)
            }
        }
    module.exports={mail_task_form,view_mail};
    