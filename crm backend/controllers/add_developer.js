
const adddeveloper = require('../models/add_developer');

const add_developer=async(req,res)=>
    {
        try {
            const{name,country_code1,mobile_no1,mobile_type1,email1,email_type1,profession_category,profession_subcategory,descriptions,
                  gst_no,industry,source,team,owner,visible_to,area,location,pin_code,state,country,website,company_social_media1,
                  company_url1}=req.body;
           
             
                const new_add_developer= new adddeveloper({name,country_code1,mobile_no1,mobile_type1,email1,email_type1,profession_category,profession_subcategory,descriptions,
                    gst_no,industry,source,team,owner,visible_to,area,location,pin_code,state,country,website,company_social_media1,
                    company_url1})
            
            const resp=await new_add_developer.save()
            res.status(200).send({message:"developer added ",developer:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_developer=async(req,res)=>
        {
            try {
                const resp=await adddeveloper.find()
                res.status(200).send({message:"developer details fetch successfully",developer:resp})
            } catch (error) {
                console.log(error)
            }
        }

    
    module.exports={add_developer,view_developer};