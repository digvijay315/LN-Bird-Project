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

            const view_lead_Byid=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const resp= await leadinfo.find({_id:id})
                        if(!resp)
                            {
                               return res.send("lead info not available")
                            }
                        res.status(200).send({message:"lead found and here are lead details:",lead:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }
                const view_lead_Bystage=async(req,res)=>
                    {
                        try {
                            const stage=req.params.stage;
                            const resp= await leadinfo.find({stage:stage})
                            if(!resp)
                                {
                                   return res.send("lead info not available")
                                }
                               
                            res.status(200).send({message:"lead found and here are lead details:",lead:resp})
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const view_lead_Byemail=async(req,res)=>
                        {
                            try {
                                const email=req.params.email;
                                const resp= await leadinfo.find({email:email})
                                if(!resp)
                                    {
                                       return res.send("lead info not available")
                                    }
                                   
                                res.status(200).send({message:"lead found and here are lead details:",lead:resp})
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        const view_lead_Bymobile=async(req,res)=>
                            {
                                try {
                                    const mobile_no=req.params.mobile_no;
                                    const resp= await leadinfo.find({mobile_no:mobile_no})
                                    if(!resp)
                                        {
                                           return res.send("lead info not available")
                                        }
                                       
                                    res.status(200).send({message:"lead found and here are lead details:",lead:resp})
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                    
            const remove_lead=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await leadinfo.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"lead not found"})
                            }
                        const resp=await leadinfo.deleteOne({_id:id})
                        res.status(200).send({message:"lead deleted successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }
                const update_lead=async(req,res)=>
                    {
                        try {
                            const id=req.params._id;
                            const user=await leadinfo.findOne({_id:id})
                            if(!user)
                                {
                                    return res.send({message:"lead not found"})
                                }
                            const resp=await leadinfo.findByIdAndUpdate(id,req.body)
                            res.status(200).send({message:"lead update successfully"})
                        } catch (error) {
                            console.log(error)
                        }
                    }

    module.exports={lead_info,leadinfo_find,view_lead_Byleadtype,remove_lead,update_lead,view_lead_Byid,view_lead_Bystage,
                    view_lead_Byemail,view_lead_Bymobile }
    