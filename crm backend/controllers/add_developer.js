
const adddeveloper = require('../models/add_developer');

const add_developer=async(req,res)=>
    {
        try {
            const{developer_name,description,address,street,country,state,
                    city,zipcode,salutation,first_name,last_name,phone,
                    email,alternative_phone,alternative_email,designation,pan_number}=req.body;
            const user=await adddeveloper.findOne({developer_name})
            if(user)
                {
                    return res.status(400).send({message:"developer already added"})
                }
                // if(!title || !first_name  || !last_name  || !country_code || !mobile_no || !mobile_type ||
                //     !email || !email_type ||
                //     !father_husband_name || !h_no || !street_address || !location || !city || !pincode ||
                //     !state || !country ||   !gender || !visible_to || !maritial_status ||
                //     !birth_date ||  !descriptions)
                //     {
                //         return res.status(400).send({message:"all fields are required"})
                //     }
                const new_add_developer= new adddeveloper({developer_name,description,address,street,country,state,
                    city,zipcode,salutation,first_name,last_name,phone,
                    email,alternative_phone,alternative_email,designation,pan_number})
            
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