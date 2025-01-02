
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

                        await updateDealsWithUpdatedContact(id, resp);

                        res.status(200).send({message:"lead update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }

                const updateDealsWithUpdatedContact = async (id, resp) => {
                    try {
                      // Find and update deals where the contact._id exists in either owner_details or associated_contact
                      const updatedDeals = await adddeal.updateMany(
                        {
                          $or: [
                            { 'owner_details._id': id }, // Match contact in owner_details
                            { 'associated_contact._id': id } // Match contact in associated_contact
                          ]
                        },
                        {
                          $set: {
                            // Update the specific contact data inside the arrays, without replacing the whole array
                            'owner_details.$[owner]': resp,    // Update matched contact in owner_details
                            'associated_contact.$[assoc]': resp // Update matched contact in associated_contact
                          }
                        },
                        {
                          arrayFilters: [
                            { 'owner._id': id },    // Filter for matching contact in owner_details
                            { 'assoc._id': id }     // Filter for matching contact in associated_contact
                          ]
                        }
                      );
                  
                      console.log(`Deals updated where contact id: ${id} was referenced. Deals updated: ${updatedDeals.nModified}`);
                    } catch (error) {
                      console.error('Error updating related deals:', error);
                    }
                  };
                  
                  
                  

                

    module.exports={add_contact,view_contact,view_contact_Byid,remove_contact,update_contact,
                    view_contact_Byemail,view_contact_Bymobile,view_contact_Bytags,view_contact_Bycompany,
                view_contact_ByName};