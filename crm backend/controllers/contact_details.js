
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
                res.status(200).send({message:"contact details fetch successfully",contact:resp})
            } catch (error) {
                console.log(error)
            }
        }
    
    const view_contact_ByName=async(req,res)=>
        {
            try {
                const name=req.params.first_name;
                const resp= await addcontact.findOne({first_name:name})
                if(!resp)
                    {
                       return res.send("contact details not available")
                    }
                res.status(200).send({message:"name found and here are contact details:",contact:resp})
            } catch (error) {
                console.log(error)
            }
        }
        const view_contact_Byemail=async(req,res)=>
            {
                try {
                    const email=req.params.email;
                    const resp= await addcontact.find({email:email})
                    if(!resp)
                        {
                           return res.send("contact details not available")
                        }
                    res.status(200).send({message:"name found and here are contact details:",contact:resp})
                } catch (error) {
                    console.log(error)
                }
            }
            const view_contact_Bymobile=async(req,res)=>
                {
                    try {
                        const mobile_no=req.params.mobile_no;
                        const resp= await addcontact.find({mobile_no:mobile_no})
                        if(!resp)
                            {
                               return res.send("contact details not available")
                            }
                        res.status(200).send({message:"name found and here are contact details:",contact:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }
        const remove_contact=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const user=await addcontact.find({_id:_id})
                    if(!user)
                        {
                            return res.send({message:"contact not found"})
                        }
                    const resp=await addcontact.deleteOne({_id:_id})
                    res.status(200).send({message:"contact deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }
            const update_contact=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await addcontact.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"lead not found"})
                            }
                        const resp=await addcontact.findByIdAndUpdate(id,req.body)
                        res.status(200).send({message:"lead update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }
    module.exports={add_contact,view_contact,view_contact_ByName,remove_contact,update_contact,view_contact_Byemail,view_contact_Bymobile};