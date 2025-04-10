const leadinfo= require('../models/leadinfo.js');

const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const lead_info=async(req,res)=>
    {
        try {
            const{title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,
                owner,team,visible_to,campegin,source,sub_source,refrencer_no,intrested_project,requirment,property_type,purpose,nri,
                sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,range,range_unit,city2,
                area2,block,pincode2,country2,state2,lattitude,longitude,country3,state3,city3,area_project,block3,specific_unit,specific_unitdetails,funding,timeline,facing,
                road,direction,unit_type2,transaction_type,furnishing,profession_category,profession_subcategory,designation,company_name,country_code1,
                company_phone,company_email,area,location,city,pincode,state,country,industry,company_social_media,company_url, 
                father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,gender,maritial_status,birth_date,
                anniversary_date,education,degree,school_college,loan,bank,amount,social_media,url,income,amount1,
                document_no,document_name,document_pic,lastcommunication,matcheddeals,matchingdeal}=req.body;
                
                // const user=await leadinfo.findOne({email})
                // if(user)
                //     {
                //         return res.status(400).send("email id already taken")
                //     }

                // const documentpic=req.files ? req.files.map(file => file.path) : [];
                const newDocumentPic = [];

                if (req.files) {
                    // Upload files to Cloudinary and get the URLs
                    for (let file of req.files) {
                      const result = await cloudinary.uploader.upload(file.path);
                      newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
                      // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
                      // fs.unlinkSync(file.path);
                    }
                  }
            
                const newleadinfo=new leadinfo({title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,
                    owner,team,visible_to,campegin,source,sub_source,refrencer_no,intrested_project,requirment,property_type,purpose,nri,
                    sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,range,range_unit,city2,
                    area2,block,pincode2,country2,state2,lattitude,longitude,country3,state3,city3,area_project,block3,specific_unit,specific_unitdetails,funding,timeline,facing,
                    road,direction,unit_type2,transaction_type,furnishing,profession_category,profession_subcategory,designation,company_name,country_code1,
                    company_phone,company_email,area,location,city,pincode,state,country,industry,company_social_media,company_url, 
                    father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,gender,maritial_status,birth_date,
                    anniversary_date,education,degree,school_college,loan,bank,amount,social_media,url,income,amount1,
                    document_no,document_name,document_pic:newDocumentPic,lastcommunication,matcheddeals,matchingdeal})
                
                    const resp=await newleadinfo.save();
                    res.status(200).send({message:"lead information saved",lead:resp})
        } catch (error) {
            console.log(error)
        }

    }

    const leadinfo_find=async(req,res)=>
        {
            try {
                const resp=await leadinfo.find().populate('matcheddeals')
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
                const update_lead = async (req, res) => {
                    try {
                        const id = req.params._id;
                        const user = await leadinfo.findOne({ _id: id });
              
                        if (!user) {
                            return res.send({ message: "Lead not found" });
                        }
                      
                        const olddocuments=user.document_pic
                        // Create an object to hold fields to be updated
                        let updatedFields = { ...req.body };
                
                        // Only process files if they are provided
                        if (req.files) {
                            const newDocumentPic = [];
                            // Upload files to Cloudinary and get the URLs
                            for (let file of req.files) {
                                const result = await cloudinary.uploader.upload(file.path);
                                newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
                            }
                
                            // Only update the document_pic field if new images are uploaded
                            if (newDocumentPic.length > 0) {
                                updatedFields.document_pic = newDocumentPic; // Update document_pic with new images
                            }
                        }

                        if(!req.files){
                            updatedFields.document_pic = olddocuments; 
                        }
                
                        // Update the lead document with the new data
                        const resp = await leadinfo.findByIdAndUpdate(id, updatedFields, { new: true });
                
                        res.status(200).send({ message: "Lead updated successfully" });
                
                    } catch (error) {
                        console.log(error);
                        res.status(500).send({ message: "Server error" });
                    }
                };
                

                    const update_leadstage=async(req,res)=>
                        {
                            try {
                                const id=req.params._id;
                                console.log(req.body);
                                
                                const user=await leadinfo.findOne({_id:id})
                                if(!user)
                                    {
                                        return res.send({message:"lead not found"})
                                    }
                                
                                 const updatedFields = {
                                  stage:req.body.stage,
                                  owner:req.body.owner,
                                  descriptions:req.body.descriptions   
                                };
                                const resp=await leadinfo.findByIdAndUpdate(id,updatedFields,{ new: true })
                                res.status(200).send({message:"stage update successfully"})
                            } catch (error) {
                                console.log(error)
                            }
                        }

                        const update_leaddocument = async (req, res) => {
                            try {
                              const id = req.params._id;  // Get lead ID from URL parameter
                              const user = await leadinfo.findOne({ _id: id });  // Find the lead by ID
                          
                              if (!user) {
                                return res.send({ message: "Lead not found" });
                              }
                          
                              // Initialize arrays to hold new data
                              const newDocumentNo = req.body.document_no || [];
                              const newDocumentName = req.body.document_name || [];
                              const newDocumentPic = [];
                          
                              // Process files (if any)
                              if (req.files) {
                                // Upload files to Cloudinary and get the URLs
                                for (let file of req.files) {
                                  const result = await cloudinary.uploader.upload(file.path);
                                  newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
                                  // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
                                  // fs.unlinkSync(file.path);
                                }
                              }
                          
                              // Retrieve the current document fields (if any) from the user document
                              const oldDocumentNo = user.document_no || [];
                              const oldDocumentName = user.document_name || [];
                              const oldDocumentPic = user.document_pic || [];
                          
                              // Combine old and new document fields
                              const updatedDocumentNo = [...oldDocumentNo, ...newDocumentNo];  // Append new document numbers to the existing ones
                              const updatedDocumentName = [...oldDocumentName, ...newDocumentName];  // Append new document names to the existing ones
                              const updatedDocumentPic = [...oldDocumentPic, ...newDocumentPic];  // Append new document pictures to the existing ones
                          
                              // Prepare updated fields object
                              const updatedFields = {
                                ...req.body,  // Keep other fields intact from the request body
                                document_no: updatedDocumentNo,  // Updated document_no array
                                document_name: updatedDocumentName,  // Updated document_name array
                                document_pic: updatedDocumentPic,  // Updated document_pic array
                              };
                          
                              // Update the lead document in the database
                              const resp = await leadinfo.findByIdAndUpdate(id, updatedFields, { new: true });
                          
                              // Return a success message
                              res.status(200).send({ message: "Lead updated successfully" });
                            } catch (error) {
                              console.error(error);  // Log error for debugging
                              res.status(500).send({ message: "An error occurred while updating the lead" });
                            }
                          };

                          const update_leadstagebyemail=async(req,res)=>
                            {
                                try {
                                    const email=req.params.email;
                                   
                                    
                                    const user=await leadinfo.findOne({email:email})
                                    if(!user)
                                        {
                                            return res.send({message:"lead not found"})
                                        }
                                    
                                   
                                    const resp=await leadinfo.findOneAndUpdate({email},req.body)
                                    res.status(200).send({message:"stage update successfully"})
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            const update_leadsingledocument = async (req, res) => {
                                try {
                                  const id = req.params._id; // Get lead ID from URL parameter
                                  const { document_name, document_no } = req.body; // Get new values
                              
                              
                                     // Find the lead document by ID
                                  const user = await leadinfo.findOne({ _id: id });
                              
                                  if (!user) {
                                    return res.status(404).send({ message: "Lead not found" });
                                  }
                              
                                  // Ensure document_name array exists
                                  if (!user.document_name || !Array.isArray(user.document_name)) {
                                    return res.status(400).send({ message: "No documents found in the lead" });
                                  }
                              
                                  // Find index where document_name matches
                                  const index = user.document_name.findIndex(name => name === document_name);
                                  
                                  if (index === -1) {
                                    return res.status(404).send({ message: "Document name not found" });
                                  }
                              
                                  // Handle file upload if a new document image is provided
                                  let newDocumentPic = user.document_pic[index]; // Keep existing image if no new file
                                  if (req.files && req.files.length > 0) {
                                    const result = await cloudinary.uploader.upload(req.files[0].path);
                                    newDocumentPic = result.secure_url; // Replace with new uploaded image
                                  }
                              
                                  // Update only the specific index
                                  user.document_no[index] = document_no;
                                  user.document_pic[index] = newDocumentPic;
                              
                                  // Save the updated document
                                  await user.save();
                              
                                  res.status(200).send({ message: "Lead document updated successfully" });
                                } catch (error) {
                                  console.error(error);
                                  res.status(500).send({ message: "An error occurred while updating the lead" });
                                }
                              };

                              const delete_leadsingledocument = async (req, res) => {
                                try {
                                  const id = req.params._id; // Get lead ID from URL parameter
                                  const { document_name } = req.body; // Get document_name to delete
                      
                              
                                  // Find the lead document by ID
                                  const user = await leadinfo.findOne({ _id: id });
                              
                                  if (!user) {
                                    return res.status(404).send({ message: "Lead not found" });
                                  }
                              
                                  // Ensure document_name array exists
                                  if (!user.document_name || !Array.isArray(user.document_name)) {
                                    return res.status(400).send({ message: "No documents found in the lead" });
                                  }
                              
                                  // Find index where document_name matches
                                  const index = user.document_name.findIndex(name => name === document_name);
                              
                                  if (index === -1) {
                                    return res.status(404).send({ message: "Document name not found" });
                                  }
                              
                                  // Remove elements at found index
                                  user.document_name.splice(index, 1);
                                  user.document_no.splice(index, 1);
                                  user.document_pic.splice(index, 1);
                              
                                  // Save the updated document
                                  await user.save();
                              
                                  res.status(200).send({ message: "Document deleted successfully" });
                                } catch (error) {
                                  console.error(error);
                                  res.status(500).send({ message: "An error occurred while deleting the document" });
                                }
                              };
                              
                              
    


                          
    module.exports={lead_info,leadinfo_find,view_lead_Byleadtype,remove_lead,update_lead,view_lead_Byid,view_lead_Bycompany,
                    view_lead_Byemail,view_lead_Bymobile,view_lead_Bystage,update_leadstage,update_leaddocument,update_leadstagebyemail,
                    update_leadsingledocument,delete_leadsingledocument }
    