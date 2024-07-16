const sitevisit_form=require('../models/site_visit_form')

const site_visit_form=async(req,res)=>
    {
        try {
            const{activity_type,executive,project,sitevisit_type,inventory,lead,confirmation,remarks,participants,remind_me,
                    complete,start_date,end_date}=req.body;

                const newsitevisitform=new sitevisit_form({activity_type,executive,project,sitevisit_type,inventory,lead,confirmation,remarks,participants,remind_me,
                    complete,start_date,end_date})
                    const resp=await newsitevisitform.save(); 
                    res.status(200).send({message:"site visit details saved",site_visit:resp})
        } catch (error) {
            console.log(error)
        }

    }
    module.exports=site_visit_form;
    