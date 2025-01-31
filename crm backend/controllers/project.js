const addproject = require("../models/project");
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 
const mongoose=require('mongoose')


require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})



const createProject = async (req, res) => {
    try {

 
      const {
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date,owner, team, visible_to, location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block,add_size,add_unit,basic_aminities,
        features_aminities,nearby_aminities,price_list,Payment_plan} = req.body;

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


      const addunit_details = [];
      let u = 0;

      const sanitizeObjectId = (id) => {
        if (id && id._id) {
          return new mongoose.Types.ObjectId(id._id); // Extract _id and convert to ObjectId
        } else if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
          return new mongoose.Types.ObjectId(id); // Convert string to ObjectId
        }
        return null; // Return null for invalid ids
      }
      
      // Function to process `owner_details` and `associated_contact`
      const processOwnerDetails = (details) => {
        if (typeof details === 'string') {
          // Split comma-separated string and convert to ObjectId array
          return details.split(',').map(id => sanitizeObjectId(id)).filter(id => id !== null);
        } else if (Array.isArray(details)) {
          return details.map(id => sanitizeObjectId(id)).filter(id => id !== null);
        }
        return []; // Return empty array if not a valid input
      }



while (u < req.body.add_unit.length) {
  const unit = req.body.add_unit[u];
 

   const ownerDetails = req.body[`add_unit[${u}].owner_details`];
   const associatedContact = req.body[`add_unit[${u}].associated_contact`];

// Process both fields
const sanitizedOwnerDetails = processOwnerDetails(ownerDetails);
const sanitizedAssociatedContact = processOwnerDetails(associatedContact);

unitDetails={

  project_name: unit.project_name,
  unit_no: unit.unit_no,
  owner_details: sanitizedOwnerDetails,
  associated_contact: sanitizedAssociatedContact,
  unit_type: unit.unit_type,
  category: unit.category,
  block: unit.block,
  size: unit.size,
  direction: unit.direction,
  facing: unit.facing,
  road:unit.facing ,
  ownership:unit.ownership,
  stage: unit.stage,
  floor: unit.floor,
  cluter_details:unit.cluter_details ,
  length: unit.length,
  bredth: unit.bredth,
  total_area: unit.total_area,
  measurment2: unit.measurment2,
  ocupation_date: unit.ocupation_date,
  age_of_construction: unit.age_of_construction,
  furnishing_details: unit.furnishing_details,
  furnished_item: unit.furnished_item,
  location: unit.location,
  lattitude: unit.lattitude,
  langitude: unit.langitude,
  uaddress: unit.uaddress,
  ustreet: unit.ustreet,
  ulocality: unit.ulocality,
  ucity: unit.ucity,
  uzip: unit.uzip,
  ustate: unit.ustate,
  ucountry: unit.ucountry,
  relation: unit.relation,
  s_no: unit.s_no,
  descriptions: unit.descriptions,
  category: unit.category,
  s_no1: unit.s_no1,
  url: unit.url,
  document_name: unit.document_name,
  document_no: unit.document_no,
  document_Date: unit.document_Date,
  linkded_contact: unit.linkded_contact
}


  // Prepare for file upload
  const imagefiles = [];
  const imagefiles1 = [];
  
  
  if (req.files) {
    const imagefield = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][preview]`));
    const imagefield1 = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][image]`));
   
    
    for (let file of imagefield) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        imagefiles.push(result.secure_url);  

        // Delete file after upload
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${file.path}`, err);
          } else {
            console.log(`Successfully deleted file: ${file.path}`);
          }
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }


    for (let file of imagefield1) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        imagefiles1.push(result.secure_url);  

        // Delete file after upload
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${file.path}`, err);
          } else {
            console.log(`Successfully deleted file: ${file.path}`);
          }
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

  }
  if (imagefiles.length > 0) {
    unitDetails.preview = imagefiles;  // Attach preview images
  }
  if (imagefiles1.length > 0) {
    unitDetails.image = imagefiles1;  // Attach main images
  }

  addunit_details.push(unitDetails);
  u++;
}



      // Simply pass the add_block as it is if no further modification is needed
      const newProject = new addproject({
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date, pic:imagefiles, owner, team, visible_to,location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block,add_size,add_unit:addunit_details,basic_aminities,
        features_aminities,nearby_aminities,price_list,Payment_plan
      });
  
      const savedProject = await newProject.save(); // Save the project
      res.status(201).json(savedProject); // Return the saved project
    } catch (error) {
      res.status(500).json({ error: 'Error creating project', message: error.message });
    }
  };

  const view_project=async(req,res)=>
    {
        try {
          const resp = await addproject.find()
          .populate({
              path: 'add_unit.owner_details', // Populate the 'owner_details' field inside 'add_unit'
              model: 'add_contact' // Specify the model to populate
          })
          .populate({
              path: 'add_unit.associated_contact', // Populate the 'associated_contact' field inside 'add_unit'
              model: 'add_contact' // Specify the model to populate
          });
            res.status(200).send({message:"project details fetch successfully",project:resp})
        } catch (error) {
            console.log(error)
        }
    }
    const view_project_Byid=async(req,res)=>
      {
          try {
              const _id=req.params._id;
              const resp= await addproject.findOne({_id:_id})
              if(!resp)
                  {
                     return res.send("project details not available")
                  }
              res.status(200).send({message:"project found and here are contact details:",project:resp})
          } catch (error) {
              console.log(error)
          }
      }
    const view_projectbyname=async(req,res)=>
      {
          try {
            const name=req.params.name
              const resp=await addproject.find({name:name})
              
              
              res.status(200).send({message:"project details fetch successfully",project:resp})
          } catch (error) {
              console.log(error)
          }
      }

      const view_projectbycityname=async(req,res)=>
        {
            try {
              const cityname=req.params.city
                const resp=await addproject.find({city:cityname})
                res.status(200).send({message:"project details fetch successfully",project:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const remove_project=async(req,res)=>
          {
              try {
                  const _id=req.params._id;
                  const user=await addproject.find({_id:_id})
                  if(!user)
                      {
                          return res.send({message:"contact not found"})
                      }
                  const resp=await addproject.deleteOne({_id:_id})
                  res.status(200).send({message:"contact deleted successfully"})
              } catch (error) {
                  console.log(error)
              }
          }

          const update_project=async(req,res)=>
            {
                try {
                    const id=req.params._id;
                    const user=await addproject.findOne({_id:id})
                    if(!user)
                        {
                            return res.send({message:"deal not found"})
                        }

                        let existingUnits = user.add_unit || [];
                       
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

                        
                        const addunit_details = [];
                        let u = 0;
                  
                        const sanitizeObjectId = (id) => {
                          if (id && id._id) {
                            return new mongoose.Types.ObjectId(id._id); // Extract _id and convert to ObjectId
                          } else if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
                            return new mongoose.Types.ObjectId(id); // Convert string to ObjectId
                          }
                          return null; // Return null for invalid ids
                        }
                        
                        // Function to process `owner_details` and `associated_contact`
                        const processOwnerDetails = (details) => {
                          if (typeof details === 'string') {
                            // Split comma-separated string and convert to ObjectId array
                            return details.split(',').map(id => sanitizeObjectId(id)).filter(id => id !== null);
                          } else if (Array.isArray(details)) {
                            return details.map(id => sanitizeObjectId(id)).filter(id => id !== null);
                          }
                          return []; // Return empty array if not a valid input
                        }
                  
                  
                  
                  while (u < req.body.add_unit?.length) {
                    const unit = req.body.add_unit[u];
                   
                  
                     const ownerDetails = req.body[`add_unit[${u}].owner_details`];
                     const associatedContact = req.body[`add_unit[${u}].associated_contact`];
                  
                  // Process both fields
                  const sanitizedOwnerDetails = processOwnerDetails(ownerDetails);
                  const sanitizedAssociatedContact = processOwnerDetails(associatedContact);
                  
                  unitDetails={
                  
                    project_name: unit.project_name,
                    unit_no: unit.unit_no,
                    owner_details: sanitizedOwnerDetails,
                    associated_contact: sanitizedAssociatedContact,
                    unit_type: unit.unit_type,
                    category: unit.category,
                    block: unit.block,
                    size: unit.size,
                    direction: unit.direction,
                    facing: unit.facing,
                    road:unit.facing ,
                    ownership:unit.ownership,
                    stage: unit.stage,
                    floor: unit.floor,
                    cluter_details:unit.cluter_details ,
                    length: unit.length,
                    bredth: unit.bredth,
                    total_area: unit.total_area,
                    measurment2: unit.measurment2,
                    ocupation_date: unit.ocupation_date,
                    age_of_construction: unit.age_of_construction,
                    furnishing_details: unit.furnishing_details,
                    furnished_item: unit.furnished_item,
                    location: unit.location,
                    lattitude: unit.lattitude,
                    langitude: unit.langitude,
                    uaddress: unit.uaddress,
                    ustreet: unit.ustreet,
                    ulocality: unit.ulocality,
                    ucity: unit.ucity,
                    uzip: unit.uzip,
                    ustate: unit.ustate,
                    ucountry: unit.ucountry,
                    relation: unit.relation,
                    s_no: unit.s_no,
                    descriptions: unit.descriptions,
                    category: unit.category,
                    s_no1: unit.s_no1,
                    url: unit.url,
                    document_name: unit.document_name,
                    document_no: unit.document_no,
                    document_Date: unit.document_Date,
                    linkded_contact: unit.linkded_contact
                  }
                  
                  
                    // Prepare for file upload
                    const imagefiles = [];
                    const imagefiles1 = [];
                    
                    
                    if (req.files) {
                      console.log(req.files);
                      
                      const imagefield = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][preview]`));
                      const imagefield1 = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][image]`));
                     
                      console.log(imagefield1);
                      
                      for (let file of imagefield) {
                        try {
                          const result = await cloudinary.uploader.upload(file.path);
                          imagefiles.push(result.secure_url);  
                  
                          // Delete file after upload
                          fs.unlink(file.path, (err) => {
                            if (err) {
                              console.error(`Failed to delete file: ${file.path}`, err);
                            } else {
                              console.log(`Successfully deleted file: ${file.path}`);
                            }
                          });
                        } catch (error) {
                          console.error('Error uploading file:', error);
                        }
                      }
                  
                  
                      for (let file of imagefield1) {
                        try {
                          const result = await cloudinary.uploader.upload(file.path);
                          imagefiles1.push(result.secure_url);  
                  
                          // Delete file after upload
                          fs.unlink(file.path, (err) => {
                            if (err) {
                              console.error(`Failed to delete file: ${file.path}`, err);
                            } else {
                              console.log(`Successfully deleted file: ${file.path}`);
                            }
                          });
                        } catch (error) {
                          console.error('Error uploading file:', error);
                        }
                      }
                  
                    }
                    if (imagefiles.length > 0) {
                      unitDetails.preview = imagefiles;  // Attach preview images
                    }
                    if (imagefiles1.length > 0) {
                      unitDetails.image = imagefiles1;  // Attach main images
                    }

                     // Find if the unit_no already exists in the existing units
      const existingUnitIndex = existingUnits.findIndex(existingUnit => existingUnit.unit_no === unit.unit_no);

      // If the unit already exists, keep the existing data
      if (existingUnitIndex !== -1) {
        addunit_details.push(existingUnits[existingUnitIndex]);  // Push the existing unit data
      } else {
        // If unit doesn't exist, add the new unit
        addunit_details.push(unitDetails);
      }
                  
                    
                    u++;
                  }
                    
                     const updatedFields = {
                        ...req.body,
                        pic:imagefiles,
                        add_unit:addunit_details
                    };
                    const resp=await addproject.findByIdAndUpdate(id,updatedFields,{ new: true })
                    res.status(200).send({message:"lead update successfully"})
                } catch (error) {
                    console.log(error)
                }
            }

            const view_projectforinventories = async (req, res) => {
                try {
                  // Retrieve project_name, block, and unit_no from request params or body
                  const { project_name, block, unit_no } = req.params; // Assuming you are sending these in the request body
                  
                  // Perform the query on the project model and filter the add_unit array using $elemMatch
                  const project = await addproject.findOne(
                    {
                      'add_unit': {
                        $elemMatch: {
                          project_name: project_name,
                          block: block,
                          unit_no: unit_no
                        }
                      }
                    },
                    {
                      'add_unit.$': 1 // This will return only the matching `add_unit` element
                    }
                  );
              
                  if (!project) {
                    return res.status(404).send({ message: "No project found matching the criteria" });
                  }
              
                  // Send the response with the project details
                  res.status(200).send({ message: "Project details fetched successfully", project: project });
                } catch (error) {
                  console.log(error);
                  res.status(500).send({ message: "An error occurred while fetching project details", error: error.message });
                }
              };

              const update_projectforinventories = async (req, res) => {
                try {
                  // Retrieve project_name, block, and unit_no from the URL parameters (params)
                  const { project_name, block, unit_no } = req.params;

                  const user = await addproject.findOneAndUpdate(
                    {
                      'add_unit': {
                        $elemMatch: {
                          project_name: project_name,
                          block: block,
                          unit_no: unit_no
                        }
                      }
                    })
              
                  let existingUnits = user || [];

                  const addunit_details = [];
                  let u = 0;
            
                  const sanitizeObjectId = (id) => {
                    if (id && id._id) {
                      return new mongoose.Types.ObjectId(id._id); // Extract _id and convert to ObjectId
                    } else if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
                      return new mongoose.Types.ObjectId(id); // Convert string to ObjectId
                    }
                    return null; // Return null for invalid ids
                  }
                  
                  // Function to process `owner_details` and `associated_contact`
                  const processOwnerDetails = (details) => {
                    if (typeof details === 'string') {
                      // Split comma-separated string and convert to ObjectId array
                      return details.split(',').map(id => sanitizeObjectId(id)).filter(id => id !== null);
                    } else if (Array.isArray(details)) {
                      return details.map(id => sanitizeObjectId(id)).filter(id => id !== null);
                    }
                    return []; // Return empty array if not a valid input
                  }
            
            
            
            while (u < req.body.add_unit?.length) {
              const unit = req.body.add_unit[u];
             
            
               const ownerDetails = req.body[`add_unit[${u}].owner_details`];
               const associatedContact = req.body[`add_unit[${u}].associated_contact`];
            
            // Process both fields
            const sanitizedOwnerDetails = processOwnerDetails(ownerDetails);
            const sanitizedAssociatedContact = processOwnerDetails(associatedContact);
            
            unitDetails={
            
              project_name: unit.project_name,
              unit_no: unit.unit_no,
              owner_details: sanitizedOwnerDetails,
              associated_contact: sanitizedAssociatedContact,
              unit_type: unit.unit_type,
              category: unit.category,
              block: unit.block,
              size: unit.size,
              direction: unit.direction,
              facing: unit.facing,
              road:unit.facing ,
              ownership:unit.ownership,
              stage: unit.stage,
              floor: unit.floor,
              cluter_details:unit.cluter_details ,
              length: unit.length,
              bredth: unit.bredth,
              total_area: unit.total_area,
              measurment2: unit.measurment2,
              ocupation_date: unit.ocupation_date,
              age_of_construction: unit.age_of_construction,
              furnishing_details: unit.furnishing_details,
              furnished_item: unit.furnished_item,
              location: unit.location,
              lattitude: unit.lattitude,
              langitude: unit.langitude,
              uaddress: unit.uaddress,
              ustreet: unit.ustreet,
              ulocality: unit.ulocality,
              ucity: unit.ucity,
              uzip: unit.uzip,
              ustate: unit.ustate,
              ucountry: unit.ucountry,
              relation: unit.relation,
              s_no: unit.s_no,
              descriptions: unit.descriptions,
              category: unit.category,
              s_no1: unit.s_no1,
              url: unit.url,
              document_name: unit.document_name,
              document_no: unit.document_no,
              document_Date: unit.document_Date,
              linkded_contact: unit.linkded_contact
            }
            
            
              // Prepare for file upload
              const imagefiles = [];
              const imagefiles1 = [];
              
              
              if (req.files) {
                console.log(req.files);
                
                const imagefield = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][preview]`));
                const imagefield1 = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][image]`));
               
                console.log(imagefield1);
                
                for (let file of imagefield) {
                  try {
                    const result = await cloudinary.uploader.upload(file.path);
                    imagefiles.push(result.secure_url);  
            
                    // Delete file after upload
                    fs.unlink(file.path, (err) => {
                      if (err) {
                        console.error(`Failed to delete file: ${file.path}`, err);
                      } else {
                        console.log(`Successfully deleted file: ${file.path}`);
                      }
                    });
                  } catch (error) {
                    console.error('Error uploading file:', error);
                  }
                }
            
            
                for (let file of imagefield1) {
                  try {
                    const result = await cloudinary.uploader.upload(file.path);
                    imagefiles1.push(result.secure_url);  
            
                    // Delete file after upload
                    fs.unlink(file.path, (err) => {
                      if (err) {
                        console.error(`Failed to delete file: ${file.path}`, err);
                      } else {
                        console.log(`Successfully deleted file: ${file.path}`);
                      }
                    });
                  } catch (error) {
                    console.error('Error uploading file:', error);
                  }
                }
            
              }
              if (imagefiles.length > 0) {
                unitDetails.preview = imagefiles;  // Attach preview images
              }
              if (imagefiles1.length > 0) {
                unitDetails.image = imagefiles1;  // Attach main images
              }

               // Find if the unit_no already exists in the existing units
const existingUnitIndex = existingUnits.findIndex(existingUnit => existingUnit.unit_no === unit.unit_no);

// If the unit already exists, keep the existing data
if (existingUnitIndex !== -1) {
  addunit_details.push(existingUnits[existingUnitIndex]);  // Push the existing unit data
} else {
  // If unit doesn't exist, add the new unit
  addunit_details.push(unitDetails);
}
            
              
              u++;
            }
              
              //  const updatedFields = {
              //     ...req.body,
              //     pic:imagefiles,
              //     add_unit:addunit_details
              // };
              
                  // Perform the update query on the project model and filter the add_unit array using $elemMatch
                  const project = await addproject.findOneAndUpdate(
                    {
                      'add_unit': {
                        $elemMatch: {
                          project_name: project_name,
                          block: block,
                          unit_no: unit_no
                        }
                      }
                    },
                    {
                      $set: {
                        'add_unit.$': {
                            ...addunit_details 
                        }
                      }
                    },
                    { new: true } // Return the updated project document after the update
                  );
              
                  if (!project) {
                    return res.status(404).send({ message: "No project found matching the criteria" });
                  }
              
                  // Send the response with the updated project details
                  res.status(200).send({
                    message: "add_unit updated successfully",
                    project: project
                  });
                } catch (error) {
                  console.log(error);
                  res.status(500).send({ message: "An error occurred while updating the project details", error: error.message });
                }
              };
              

              

   module.exports={createProject,view_project,view_projectbyname,view_projectbycityname,remove_project,view_project_Byid,
    update_project,view_projectforinventories,update_projectforinventories}