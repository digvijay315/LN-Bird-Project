
const addcontact = require('../models/add_contact');

const add_contact=async(req,res)=>
    {
        try {
            const{title,first_name,last_name,country_code,mobile_no,mobile_type,
                    email,email_type,title_company,designation,company_name,tags,
                    father_husband_name,h_no,street_address,location,city,pincode,
                    state,country,source,category,owner,team,gender,visible_to,maritial_status,
                    birth_date,anniversary_date,education,degree,school_college,loan,bank,amount,
                    social_media,url,income,amount1,website,industry,descriptions}=req.body;
            const user=await addcontact.findOne({email})
            if(user)
                {
                    return res.status(400).send({message:"email id already taken"})
                }
                // if(!title || !first_name  || !last_name  || !country_code || !mobile_no || !mobile_type ||
                //     !email || !email_type ||
                //     !father_husband_name || !h_no || !street_address || !location || !city || !pincode ||
                //     !state || !country ||   !gender || !visible_to || !maritial_status ||
                //     !birth_date ||  !descriptions)
                //     {
                //         return res.status(400).send({message:"all fields are required"})
                //     }
                const new_add_contact= new addcontact({title,first_name,last_name,country_code,mobile_no,mobile_type,
                email,email_type,title_company,designation,company_name,tags,
                father_husband_name,h_no,street_address,location,city,pincode,
                state,country,source,category,owner,team,gender,visible_to,maritial_status,
                birth_date,anniversary_date,education,degree,school_college,loan,bank,amount,
                social_media,url,income,amount1,website,industry,descriptions})
            
            const resp=await new_add_contact.save()
            res.status(200).send({message:"contact saved",user:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_contact=async(req,res)=>
        {
            try {
                const resp=await addcontact.find()
                res.status(200).send({message:"contact details fetch successfully",contact_details:resp})
            } catch (error) {
                console.log(error)
            }
        }
    
    const view_contact_ByName=async(req,res)=>
        {
            try {
                const name=req.params.first_name;
                const user= await addcontact.findOne({first_name:name})
                if(!user)
                    {
                       return res.send("contact details not available")
                    }
                res.status(200).send({message:"name found and here are contact details:",contact:user})
            } catch (error) {
                console.log(error)
            }
        }
        const remove_contact=async(req,res)=>
            {
                try {
                    const name=req.params.first_name;
                    const user=await addcontact.findOne({first_name:name})
                    if(!user)
                        {
                            return res.send({message:"contact not found"})
                        }
                    const resp=await addcontact.deleteOne({first_name:name})
                    res.status(200).send({message:"contact deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }
    module.exports={add_contact,view_contact,view_contact_ByName,remove_contact};