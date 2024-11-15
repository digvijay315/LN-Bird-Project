const leadinfo= require('../models/leadinfo.js');

const lead_info=async(req,res)=>
    {
        try {
            const{title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,
                owner,team,visible_to,campegin,source,sub_source,refrencer_no,intrested_project,requirment,property_type,purpose,nri,
                sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,city2,
                area2,block,pincode2,country2,state2,lattitude,longitude,specific_unit,specific_unitdetails,funding,timeline,facing,
                road,transaction_type,furnishing,profession_category,profession_subcategory,designation,company_name,country_code1,
                company_phone,company_email,area,location,city,pincode,state,country,industry,company_social_media,company_url, 
                father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,gender,maritial_status,birth_date,
                anniversary_date,education,degree,school_college,loan,bank,amount,social_media,url,income,amount1,
                document_no,document_name,document_pic,lastcommunication}=req.body;
                
                // const user=await leadinfo.findOne({email})
                // if(user)
                //     {
                //         return res.status(400).send("email id already taken")
                //     }

                const documentpic=req.files ? req.files.map(file => file.path) : [];
            
                const newleadinfo=new leadinfo({title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,
                    owner,team,visible_to,campegin,source,sub_source,refrencer_no,intrested_project,requirment,property_type,purpose,nri,
                    sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,city2,
                    area2,block,pincode2,country2,state2,lattitude,longitude,specific_unit,specific_unitdetails,funding,timeline,facing,
                    road,transaction_type,furnishing,profession_category,profession_subcategory,designation,company_name,country_code1,
                    company_phone,company_email,area,location,city,pincode,state,country,industry,company_social_media,company_url, 
                    father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,gender,maritial_status,birth_date,
                    anniversary_date,education,degree,school_college,loan,bank,amount,social_media,url,income,amount1,
                    document_no,document_name,document_pic:documentpic,lastcommunication})
                
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
                        const _id=req.params._id;
                        const resp= await leadinfo.find({_id:_id})
                        if(!resp)
                            {
                               return res.send("lead info not available")
                            }
                        res.status(200).send({message:"lead found and here are lead details:",lead:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }
                const view_lead_Bycompany=async(req,res)=>
                    {
                        try {
                            const company_name=req.params.company_name;
                            const resp= await leadinfo.find({company_name:company_name})
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
                             const document_pic = req.files && req.files.length > 0 ? req.files.map(file => file.path) : user.document_pic;
                             const updatedFields = {
                                ...req.body,
                                document_pic // Update preview field with new images if provided
                            };
                            const resp=await leadinfo.findByIdAndUpdate(id,updatedFields,{ new: true })
                            res.status(200).send({message:"lead update successfully"})
                        } catch (error) {
                            console.log(error)
                        }
                    }

    module.exports={lead_info,leadinfo_find,view_lead_Byleadtype,remove_lead,update_lead,view_lead_Byid,view_lead_Bycompany,
                    view_lead_Byemail,view_lead_Bymobile,view_lead_Bystage }
    