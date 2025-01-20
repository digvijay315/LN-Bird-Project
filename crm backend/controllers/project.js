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

      const addunit_details = [];
      let u = 0;
  
      // Loop to process add_Content fields
      while (req.body[`add_unit[${u}].unit_no`]) {

      



        const project_name = req.body[`add_unit[${u}].project_name`];
        const unit_no = req.body[`add_unit[${u}].unit_no`];
         const unit_type = req.body[`add_unit[${u}].unit_type`];
         const category = req.body[`add_unit[${u}].category`];
         const block = req.body[`add_unit[${u}].block`];
         const size = req.body[`add_unit[${u}].size`];
         const direction = req.body[`add_unit[${u}].direction`];
         const facing = req.body[`add_unit[${u}].facing`];
         const road = req.body[`add_unit[${u}].road`];
         const ownership = req.body[`add_unit[${u}].ownership`];
         const stage = req.body[`add_unit[${u}].stage`];
         const floor = req.body[`add_unit[${u}].floor`];
         const cluter_details = req.body[`add_block[${u}].cluter_details`];
         const length = req.body[`add_unit[${u}].length`];
         const bredth = req.body[`add_unit[${u}].bredth`];
         const total_area = req.body[`add_unit[${u}].total_area`];
         const measurment2 = req.body[`add_unit[${u}].measurment2`];
         const ocupation_date = req.body[`add_unit[${u}].ocupation_date`];
         const age_of_construction = req.body[`add_unit[${u}].age_of_construction`];
         const furnishing_details = req.body[`add_unit[${u}].furnishing_details`];
         const furnished_item = req.body[`add_unit[${u}].furnished_item`];
         const location = req.body[`add_unit[${u}].location`];
         const lattitude = req.body[`add_unit[${u}].lattitude`];
         const langitude = req.body[`add_unit[${u}].langitude`];
         const uaddress = req.body[`add_unit[${u}].uaddress`];
         const ustreet = req.body[`add_unit[${u}].ustreet`];
         const ulocality = req.body[`add_unit[${u}].ulocality`];
         const ucity = req.body[`add_unit[${u}].ucity`];
         const uzip = req.body[`add_unit[${u}].uzip`];
         const ustate = req.body[`add_unit[${u}].ustate`];
         const ucountry = req.body[`add_unit[${u}].ucountry`];
         const owner_details = req.body[`add_unit[${u}].owner_details`];
         const associated_contact = req.body[`add_unit[${u}].associated_contact`];
         const relation = req.body[`add_unit[${u}].relation`];
         const s_no = req.body[`add_unit[${u}].s_no`];
         const descriptions = req.body[`add_unit[${u}].descriptions`];
        //  const category = req.body[`add_unit[${u}].category`];
         const s_no1 = req.body[`add_unit[${u}].s_no1`];
         const url = req.body[`add_unit[${u}].url`];
         const document_name = req.body[`add_unit[${u}].document_name`];
         const document_no = req.body[`add_unit[${u}].document_no`];
         const document_Date = req.body[`add_unit[${u}].document_Date`];
         const linkded_contact = req.body[`add_unit[${u}].linkded_contact`];


         const imagefiles = [];
         if (req.files) {
        
          
          
               
                  const imagefield = req.files.filter(file => file.fieldname.includes('preview'));
                  
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


         
        
         addunit_details.push({
          project_name,unit_no,unit_type,category,block,size,direction,facing,road,ownership,
          stage,floor,cluter_details,length,bredth,total_area,measurment2,ocupation_date,age_of_construction,furnishing_details,
          furnished_item,location,lattitude,langitude,uaddress,ustreet,ulocality,ucity,uzip,ustate,ucountry,owner_details,
          associated_contact,relation,s_no,descriptions,s_no1,url,document_name,document_no,document_Date,linkded_contact,preview:imagefiles
        });
  
        u++;
      }

      const addsize_details = [];
      let s = 0;
  
      // Loop to process add_Content fields
      while (req.body[`add_size[${s}].size_name`]) {
        const size_name = req.body[`add_size[${s}].size_name`];
        const block1 = req.body[`add_size[${s}].block1`];
         const category = req.body[`add_size[${s}].category`];
         const sub_category = req.body[`add_size[${s}].sub_category`];
         const unit_type = req.body[`add_size[${s}].unit_type`];
         const total_sealable_area = req.body[`add_size[${s}].total_sealable_area`];
         const sq_feet1 = req.body[`add_size[${s}].sq_feet1`];
         const covered_area = req.body[`add_size[${s}].covered_area`];
         const sq_feet2 = req.body[`add_size[${s}].sq_feet2`];
         const carpet_area = req.body[`add_size[${s}].carpet_area`];
         const sq_feet3 = req.body[`add_size[${s}].sq_feet3`];
         const loading = req.body[`add_size[${s}].loading`];
         const percentage = req.body[`add_size[${s}].percentage`];
         const length = req.body[`add_size[${s}].length`];
         const yard1 = req.body[`add_size[${s}].yard1`];
         const bredth = req.body[`add_size[${s}].bredth`];
         const yard2 = req.body[`add_size[${s}].yard2`];
         const total_area = req.body[`add_size[${s}].total_area`];
         const yard3 = req.body[`add_size[${s}].yard3`];
    
        addsize_details.push({
          size_name,block1,category,sub_category,unit_type,total_sealable_area,sq_feet1,covered_area,sq_feet2,carpet_area,
          sq_feet3,loading,percentage,length,yard1,bredth,yard2,total_area,yard3
        });
  
        s++;
      }




  
      // Simply pass the add_block as it is if no further modification is needed
      const newProject = new addproject({
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date, pic:imagefiles, owner, team, visible_to,location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block:addblock_details,add_size:addsize_details,add_unit:addunit_details,basic_aminities,
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