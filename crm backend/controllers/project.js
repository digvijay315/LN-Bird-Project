const addproject = require("../models/project");
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 



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
         
          // console.log(req.files);
          
               
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


                const imagefiles1 = [];
                const imagefield1 = req.files.filter(file => file.fieldname.includes('preview'));
            
                // Handle imagefiles1 (for 'preview' field) and upload to Cloudinary
                if (imagefield1.length > 0) {
                  for (let file of imagefield1) {
                    const result = await cloudinary.uploader.upload(file.path);
                    
                    
                    imagefiles1.push(result.secure_url);  // Add Cloudinary URL
                    fs.unlink(file.path, (err) => {
                      if (err) {
                        console.error(`Failed to delete file: ${file.path}`, err);
                      } else {
                        console.log(`Successfully deleted file: ${file.path}`);
                      }
                    });
                  }
                }
                console.log(imagefiles1);
                // If add_unit is provided, set its preview field to imagefiles1 (Cloudinary URLs)
    if (add_unit && add_unit.length > 0) {
      // Option 1: Update the first unit's preview field
      add_unit[0].preview = imagefiles1;  // Add Cloudinary URLs to the first unit's preview
      
      // Option 2: Update all units' preview field
      // add_unit.forEach(unit => {
      //   unit.preview = imagefiles1;  // Add Cloudinary URLs to each unit's preview
      // });
    }


 const addblock_details = [];
      let i = 0;
  
      // Loop to process add_Content fields
      while (req.body[`add_block[${i}].block_name`]) {
        const block_name = req.body[`add_block[${i}].block_name`];
        const category = req.body[`add_block[${i}].category`];
         const sub_category = req.body[`add_block[${i}].sub_category`];
         const land_area = req.body[`add_block[${i}].land_area`];
         const measurment = req.body[`add_block[${i}].measurment`];
         const total_blocks = req.body[`add_block[${i}].total_blocks`];
         const total_floors = req.body[`add_block[${i}].total_floors`];
         const total_units = req.body[`add_block[${i}].total_units`];
         const status = req.body[`add_block[${i}].status`];
         const launched_on = req.body[`add_block[${i}].launched_on`];
         const expected_competion = req.body[`add_block[${i}].expected_competion`];
         const possession = req.body[`add_block[${i}].possession`];
         const parking_type = req.body[`add_block[${i}].parking_type`];
         const rera_no = req.body[`add_block[${i}].rera_no`];
    
        addblock_details.push({
          block_name,category,sub_category,land_area,measurment,total_blocks,total_floors,total_units,status,launched_on,
          expected_competion,possession,parking_type,rera_no
        });
  
        i++;
      }


  
      // Simply pass the add_block as it is if no further modification is needed
      const newProject = new addproject({
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date, pic:imagefiles, owner, team, visible_to,location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block:addblock_details,add_size,add_unit,basic_aminities,
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
            const resp=await addproject.find()
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
                        const pics = req.files ? req.files.map(item => item.path) : [];
                        const preview=req.files ? req.files.map((item=>item.path)):[]
                    
                     const updatedFields = {
                        ...req.body,
                        preview,
                        pics // Update preview field with new images if provided
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
                            ...req.body 
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