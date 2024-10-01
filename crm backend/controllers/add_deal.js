
const adddeal = require('../models/deal.js');
const path = require('path');

const add_deal=async(req,res)=>
    {
        try {
            const{available_for,stage,project,block,unit_number,floors,expected_price,quote_price,price1,price2,security_deposite,
                    maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
                    team,user,visible_to,document_details=[],s_no,descriptions,category,s_no1,url,website,social_media,send_matchedlead}=req.body;

                    const pics = req.files ? req.files.map(item => item.path) : [];
                    const preview=req.files ? req.files.map((item=>item.path)):[]
                 
                    
                    const updatedDocumentDetails = document_details.map((doc, index) => ({
                        ...doc,
                        pic: pics[index] || doc.pic // Add pic from files if available
                    }));
           
                const new_add_deal= new adddeal({available_for,stage,project,block,unit_number,floors,expected_price,quote_price,price1,price2,security_deposite,
                    maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
                    team,user,visible_to,document_details:updatedDocumentDetails,s_no,preview,descriptions,category,s_no1,url,website,social_media,send_matchedlead})
            
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

    
    module.exports={add_deal,view_deal};