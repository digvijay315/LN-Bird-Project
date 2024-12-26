
const adddeal = require('../models/deal.js');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 



require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

// const add_deal=async(req,res)=>
//     {
//         try {
//             const{project_category,project_subcategory,location,available_for,stage,project,block,unit_number,floors,expected_price,quote_price,security_deposite,
//                     maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
//                     team,user,visible_to,owner_details,associated_contact,relation,document_details,s_no,descriptions,category,s_no1,url,
//                     website,social_media,send_matchedlead,matchedleads,matchinglead,remarks}=req.body;
                    
   
//                     //  if (req.files.pic) {
//                     //             // Upload files to Cloudinary and get the URLs
//                     //             for (let file of req.files.pic) {
//                     //               const result = await cloudinary.uploader.upload(file.path);
//                     //               newDocumentPic1.push(result.secure_url);  // Store the URL of the uploaded image
//                     //               // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
//                     //               // fs.unlinkSync(file.path);
//                     //             }
//                     //           }
//                     const images=[];
//                     if (req.files) {
//                                for (let file of req.files) {
//                                             const result = await cloudinary.uploader.upload(file.path);
//                                   images.push(result.secure_url);
//                                 }
//                             }
                    
                    

                   
                 
                    
//                     // const updatedDocumentDetails = document_details ? document_details.map((doc, index) => ({
//                     //     ...doc,
//                     //     pic: pics[index] || doc.pic // Add pic from files if available
//                     // })):[];
           
//                 const new_add_deal= new adddeal({project_category,project_subcategory,location,available_for,stage,project,block,unit_number,floors,expected_price,quote_price,security_deposite,
//                     maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
//                     team,user,visible_to,owner_details,associated_contact,relation,document_details,
//                     s_no,preview:images,descriptions,category,s_no1,url,website,social_media,send_matchedlead,matchedleads,matchinglead,remarks})
            
//             const resp=await new_add_deal.save()
//             res.status(200).send({message:"deal added ",deal:resp})
//         } catch (error) {
//             console.log(error)
//         }
//     }

const add_deal = async (req, res) => {
    try {





      const adddocument_details = [];
      let i = 0;
  
      // Loop to process add_Content fields
      while (req.body[`document_details[${i}].document_name`]) {
        const document_name = req.body[`document_details[${i}].document_name`];
        const document_no = req.body[`document_details[${i}].document_no`];
        const document_Date = req.body[`document_details[${i}].document_Date`];
        const linkded_contact = req.body[`document_details[${i}].linkded_contact`];
    
  
        const imagefiles = [];
 
  
       
        if (req.files) {

       
          const imagefield = req.files.filter(file => file.fieldname.includes('pic'));
          
          if (imagefield.length > 0) {
            for (let file of imagefield) {
              const result = await cloudinary.uploader.upload(file.path);
              imagefiles.push(result.secure_url);  
              fs.unlink(file.path, (err) => {
                if (err) {
                  console.error(`Failed to delete file: ${file.path}`, err);
                } else {
                  console.log(`Successfully deleted file: ${file.path}`);
                }
              });
            }
          }
        }
  
   
        adddocument_details.push({
            document_name,
          document_Date,
          document_no,
          linkded_contact,
          pic: imagefiles, 
        });
  
        i++;
      }
          


  
      const images = [];
 
  
      // Process image files
      if (req.files) {
        console.log(req.files);
        
        const imageField = req.files.filter(file => file.fieldname.includes('preview'));
        for (let file of imageField) {
          const result = await cloudinary.uploader.upload(file.path);
          images.push(result.secure_url);
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error(`Failed to delete file: ${file.path}`, err);
            } else {
              console.log(`Successfully deleted file: ${file.path}`);
            }
          });
        }
    }
  
    

    const {
        project_category, project_subcategory, location, available_for, stage, project, block, unit_number, floors, expected_price,
        quote_price, security_deposite, maintainence_charge, rent_escltion, rent_period, fitout_perioud, deal_type, transaction_type,
        source, white_portion, team, user, visible_to, owner_details, associated_contact, relation, s_no, descriptions,
        category, s_no1, url, website, social_media, send_matchedlead, matchedleads, matchinglead, remarks
      } = req.body;
  

      const new_add_deal = new adddeal({
        project_category, project_subcategory, location, available_for, stage, project, block, unit_number, floors, expected_price,
        quote_price, security_deposite, maintainence_charge, rent_escltion, rent_period, fitout_perioud, deal_type, transaction_type,
        source, white_portion, team, user, visible_to, owner_details, associated_contact, relation, document_details: adddocument_details,
        s_no, descriptions, category, s_no1, url, website, social_media, send_matchedlead, matchedleads, matchinglead, remarks,
        preview: images  // Store Cloudinary URLs directly in the preview field
      });
  
      // Save the deal to the database
      const resp = await new_add_deal.save();
      res.status(200).send({ message: 'Deal added successfully', deal: resp });
  
    } catch (error) {
      console.error('Error adding deal:', error);
      res.status(500).send({ message: 'Error occurred while adding deal', error: error.message });
    }
  };

  


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

            const view_deal_Byproject=async(req,res)=>
                {
                    try {
                        const project=req.params.project;
                        const resp= await adddeal.find({project:project})
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

                    const update_dealbyprojectandunit = async (req, res) => {
                        try {
                         
                     
                          
                          const { project, block,unit_number } = req.params;  // Extract project and unit from URL params
                          const { newstage } = req.body;  // Extract new stage from request body
                      
                        //   console.log(`Received stage: ${newstage} for project: ${project}, block: ${block}, unit_number: ${unit_number}`);
                      
                          // Update all matching deals in a single operation
                          const result = await adddeal.updateMany(
                            { project: project, block: block, unit_number: unit_number },
                            { $set: { stage: newstage } }
                          );
                      
                          // If no deals were updated
                          if (result.matchedCount === 0) {
                            return res.status(400).send({ message: "No deal found with the specified unit number and block" });
                          }
                      
                          // Return success message with the count of updated deals
                          return res.status(200).send({ message: `${result.modifiedCount} deal(s) updated successfully` });
                      
                        } catch (error) {
                          console.error(error);
                          return res.status(500).send({ message: "Internal Server Error" });
                        }
                      };
                      
                      
                      

                        


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
                        const update_dealbyowner=async(req,res)=>
                            {
                                try {
                                    const id=req.params._id;
                                    const user=await adddeal.findOne({_id:id})
                                    if(!user)
                                        {
                                            return res.send({message:"deal not found"})
                                        }
                                    
                                     const updatedFields = {
                                       ...req.body
                                    };
                                    const resp=await adddeal.findByIdAndUpdate(id,updatedFields,{ new: true })
                                    res.status(200).send({message:"lead update successfully"})
                                } catch (error) {
                                    console.log(error)
                                }
                            }
        
    
    module.exports={add_deal,view_deal,view_deal_Bystage,remove_deal,update_deal,view_deal_Byid,update_dealbysingle,update_dealbyowner,
        update_dealbyprojectandunit,view_deal_Byproject
    };