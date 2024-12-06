
const adddeal = require('../models/deal.js');
const path = require('path');

const add_deal=async(req,res)=>
    {
        try {
            const{project_category,project_subcategory,location,available_for,stage,project,block,unit_number,floors,expected_price,quote_price,security_deposite,
                    maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
                    team,user,visible_to,owner_details,associated_contact,relation,document_details,s_no,descriptions,category,s_no1,url,
                    website,social_media,send_matchedlead,matchedleads,matchinglead,remarks}=req.body;

                    const pics = req.files ? req.files.map(item => item.path) : [];
                    const preview=req.files ? req.files.map((item=>item.path)):[]
                 
                    
                    const updatedDocumentDetails = document_details ? document_details.map((doc, index) => ({
                        ...doc,
                        pic: pics[index] || doc.pic // Add pic from files if available
                    })):[];
           
                const new_add_deal= new adddeal({project_category,project_subcategory,location,available_for,stage,project,block,unit_number,floors,expected_price,quote_price,security_deposite,
                    maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
                    team,user,visible_to,owner_details,associated_contact,relation,document_details:updatedDocumentDetails,
                    s_no,preview,descriptions,category,s_no1,url,website,social_media,send_matchedlead,matchedleads,matchinglead,remarks})
            
            const resp=await new_add_deal.save()
            res.status(200).send({message:"deal added ",deal:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_deal=async(req,res)=>
        {
            try {
                const resp=await adddeal.find()
                res.status(200).send({message:"deal details fetch successfully",deal:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const view_deal_Bystage=async(req,res)=>
            {
                try {
                    const stage=req.params.stage;
                    const resp= await adddeal.find({stage:stage})
                    if(!resp)
                        {
                           return res.send("lead info not available")
                        }
                       
                    res.status(200).send({message:"lead found and here are lead details:",deal:resp})
                } catch (error) {
                    console.log(error)
                }
            }

            const remove_deal=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await adddeal.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"deal not found"})
                            }
                        const resp=await adddeal.deleteOne({_id:id})
                        res.status(200).send({message:"deal deleted successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }

                const update_deal=async(req,res)=>
                    {
                        try {
                            const id=req.params._id;
                            const user=await adddeal.findOne({_id:id})
                            if(!user)
                                {
                                    return res.send({message:"deal not found"})
                                }
                                const pics = req.files ? req.files.map(item => item.path) : [];
                                const preview=req.files ? req.files.map((item=>item.path)):[]
                            
                             const updatedFields = {
                                ...req.body,
                                preview,
                                pics // Update preview field with new images if provided
                            };
                            const resp=await adddeal.findByIdAndUpdate(id,updatedFields,{ new: true })
                            res.status(200).send({message:"lead update successfully"})
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    const view_deal_Byid=async(req,res)=>
                        {
                            try {
                                const _id=req.params._id;
                                const resp= await adddeal.findOne({_id:_id})
                                if(!resp)
                                    {
                                       return res.send("lead info not available")
                                    }
                                res.status(200).send({message:"lead found and here are lead details:",deal:resp})
                            } catch (error) {
                                console.log(error)
                            }
                        }

                    const update_dealbysingle=async(req,res)=>
                        {
                            try {
                                const id=req.params._id;
                                const user=await adddeal.findOne({_id:id})
                                if(!user)
                                    {
                                        return res.send({message:"deal not found"})
                                    }
                                
                                 const updatedFields = {
                                    remarks:req.body.remarks,
                                    stage:req.body.stage,stage:req.body.stage
                                };
                                const resp=await adddeal.findByIdAndUpdate(id,updatedFields,{ new: true })
                                res.status(200).send({message:"lead update successfully"})
                            } catch (error) {
                                console.log(error)
                            }
                        }
        
    
    module.exports={add_deal,view_deal,view_deal_Bystage,remove_deal,update_deal,view_deal_Byid,update_dealbysingle};