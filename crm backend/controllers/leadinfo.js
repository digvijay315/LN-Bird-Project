const leadinfo= require('../models/leadinfo.js');

const lead_info=async(req,res)=>
    {
        try {
            const{title,first_name,last_name,country_code,mobile_no,mobile_type,
                email,email_type,title_company,designation,company_name,tags,
                lead_type,descriptions,team,owner,campaign,source,sub_source,
                stage,channel_partner,intrested_project}=req.body;
                
                const user=await leadinfo.findOne({email})
                if(user)
                    {
                        return res.status(400).send("email id already taken")
                    }
            
                const newleadinfo=new leadinfo({title,first_name,last_name,country_code,mobile_no,mobile_type,
                    email,email_type,title_company,designation,company_name,tags,
                    lead_type,descriptions,team,owner,campaign,source,sub_source,
                    stage,channel_partner,intrested_project})
                
                    const resp=await newleadinfo.save();
                    res.status(200).send({message:"lead information saved",lead:resp})
        } catch (error) {
            console.log(error)
        }

    }

    const leadinfo_find=async(req,res)=>
        {
            try {
                const resp=await leadinfo.find()
                if(!resp)
                    {
                        return res.send("no lead infomartion available")
                    }
                res.status(200).send({message:"lead infomation:",lead:resp})
            } catch (error) {
                console.log(error)
            }
        }
        const view_lead_Byleadtype=async(req,res)=>
            {
                try {
                    const lead=req.params.lead_type;
                    const resp= await leadinfo.find({lead_type:lead})
                    if(!resp)
                        {
                           return res.send("lead info not available")
                        }
                    res.status(200).send({message:"lead found and here are lead details:",lead:resp})
                } catch (error) {
                    console.log(error)
                }
            }
    module.exports={lead_info,leadinfo_find,view_lead_Byleadtype}
    