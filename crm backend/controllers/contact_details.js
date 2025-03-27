
const addcontact = require('../models/add_contact');
const adddeal = require('../models/deal.js');

const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

// const add_contact = async (req, res) => {
//     try {
//         const { 
//             title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
//             source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
//             company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
//             father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, maritial_status,
//             birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
//             income, amount1, document_no, document_name, relation, lastcommunication
//         } = req.body;

//         // 'req.files' will contain the uploaded files
//         const images = [];

//         // Loop through each file in 'req.files' and upload them to Cloudinary
//         for (let file of req.files) {
//             const result = await cloudinary.uploader.upload(file.path);
//             images.push(result.secure_url);
//             //fs.unlinkSync(file.path);
          
          
//         }

//         // Create a new contact with the uploaded Cloudinary URLs
//         const new_add_contact = new addcontact({
//             title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
//             source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
//             company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
//             father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, maritial_status,
//             birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
//             income, amount1, document_no, document_name, document_pic: images, relation, lastcommunication
//         });

//         const resp = await new_add_contact.save();
//         res.status(200).send({ message: "Contact saved", user: resp });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: "Error saving contact", error });
//     }
// };


const add_contact = async (req, res) => {
    try {
        const { 
            title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
            source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
            company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
            father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
            birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
            income, amount1, document_no, document_name,document_pic, relation, lastcommunication
        } = req.body;

        // 'req.files' will contain the uploaded files
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


        // Create a new contact with the uploaded Cloudinary URLs
        const newAddContact = new addcontact({
            title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
            source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
            company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
            father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
            birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
            income, amount1, document_no, document_name, document_pic: newDocumentPic, relation, lastcommunication
        });

        // Save to database
        const resp = await newAddContact.save();
        res.status(200).send({ message: "Contact saved", user: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving contact", error });
    }
};

    const view_contact=async(req,res)=>
        {
            try {
                const resp=await addcontact.find()
                res.status(200).send({message:"contact details fetch successfully",contact:resp})
            } catch (error) {
                console.log(error)
            }
        }
        
    
    const view_contact_Byid=async(req,res)=>
        {
            try {
                const _id=req.params._id;
                const resp= await addcontact.findOne({_id:_id})
                if(!resp)
                    {
                       return res.send("contact details not available")
                    }
                res.status(200).send({message:"name found and here are contact details:",contact:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const view_contact_ByName=async(req,res)=>
            {
                try {
                    const name=req.params.first_name;
                    const resp= await addcontact.find({first_name:name})
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
                const view_contact_Bytags=async(req,res)=>
                    {
                        try {
                            const tags=req.params.tags;
                            const resp= await addcontact.find({tags:tags})
                            if(!resp)
                                {
                                   return res.send("contact details not available")
                                }
                            res.status(200).send({message:"name found and here are contact details:",contact:resp})
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const view_contact_Bycompany=async(req,res)=>
                        {
                            try {
                                const company_name=req.params.company_name;
                                const resp= await addcontact.find({company_name:company_name})
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
                        
                        const updatedFields = {
                            ...req.body,
                            document_pic:newDocumentPic // Update preview field with new images if provided
                        };
                        const resp=await addcontact.findByIdAndUpdate(id,updatedFields,{ new: true })

                        // await updateDealsWithUpdatedContact(id, resp);

                        res.status(200).send({message:"lead update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }

                // const updateDealsWithUpdatedContact = async (id, resp) => {
                //     try {
                //       // Find and update deals where the contact._id exists in either owner_details or associated_contact
                //       const updatedDeals = await adddeal.updateMany(
                //         {
                //           $or: [
                //             { 'owner_details._id': id }, // Match contact in owner_details
                //             { 'associated_contact._id': id } // Match contact in associated_contact
                //           ]
                //         },
                //         {
                //           $set: {
                //             // Update the specific contact data inside the arrays, without replacing the whole array
                //             'owner_details.$[owner]': resp,    // Update matched contact in owner_details
                //             'associated_contact.$[assoc]': resp // Update matched contact in associated_contact
                //           }
                //         },
                //         {
                //           arrayFilters: [
                //             { 'owner._id': id },    // Filter for matching contact in owner_details
                //             { 'assoc._id': id }     // Filter for matching contact in associated_contact
                //           ]
                //         }
                //       );
                  
                //       console.log(`Deals updated where contact id: ${id} was referenced. Deals updated: ${updatedDeals.nModified}`);
                //     } catch (error) {
                //       console.error('Error updating related deals:', error);
                //     }
                //   };

                      const add_contactdocument = async (req, res) => {
                                            try {
                                              const id = req.params._id;  // Get lead ID from URL parameter
                                              const user = await addcontact.findOne({ _id: id });  // Find the lead by ID
                                          
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
                                              const resp = await addcontact.findByIdAndUpdate(id, updatedFields, { new: true });
                                          
                                              // Return a success message
                                              res.status(200).send({ message: "Lead updated successfully" });
                                            } catch (error) {
                                              console.error(error);  // Log error for debugging
                                              res.status(500).send({ message: "An error occurred while updating the lead" });
                                            }
                                          };

                     const update_contactsingledocument = async (req, res) => {
                                                try {
                                                  const id = req.params._id; // Get lead ID from URL parameter
                                                  const { document_name, document_no } = req.body; // Get new values
                                              
                                              
                                                     // Find the lead document by ID
                                                  const user = await addcontact.findOne({ _id: id });
                                              
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
                                              
                                                  res.status(200).send({ message: "Contact document updated successfully" });
                                                } catch (error) {
                                                  console.error(error);
                                                  res.status(500).send({ message: "An error occurred while updating the lead" });
                                                }
                                              };
                  const delete_contactsingledocument = async (req, res) => {
                                                try {
                                                  const id = req.params._id; // Get lead ID from URL parameter
                                                  const { document_name } = req.body; // Get document_name to delete
                                      
                                              
                                                  // Find the lead document by ID
                                                  const user = await addcontact.findOne({ _id: id });
                                              
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
                  
                  

                

    module.exports={add_contact,view_contact,view_contact_Byid,remove_contact,update_contact,
                    view_contact_Byemail,view_contact_Bymobile,view_contact_Bytags,view_contact_Bycompany,
                view_contact_ByName,update_contactsingledocument,delete_contactsingledocument,add_contactdocument};