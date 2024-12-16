const sitevisit_form=require('../models/site_visit_form')

const site_visit_form=async(req,res)=>
    {
        try {
            const{activity_type,title,executive,project,sitevisit_type,inventory,lead,confirmation,remark,participants,
                    complete, title2,first_name,last_name,mobile_no,email,stage,status,intrested_inventory,
                    date,feedback}=req.body;

                const newsitevisitform=new sitevisit_form({activity_type,title,executive,project,sitevisit_type,inventory,lead,confirmation,remark,participants,
                    complete, title2,first_name,last_name,mobile_no,email,stage,status,intrested_inventory,date,feedback})
                    const resp=await newsitevisitform.save(); 
                    res.status(200).send({message:"site visit details saved",site_visit:resp})
        } catch (error) {
            console.log(error)
        }

    }

    const view_site=async(req,res)=>
        {
            try {
                const resp=await sitevisit_form.find()
                res.status(200).send({message:"site visit details fetch successfully",sitevisit:resp})
            } catch (error) {
                console.log(error)
            }
        }
    module.exports={site_visit_form,view_site};
    