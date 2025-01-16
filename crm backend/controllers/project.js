const addproject = require("../models/project");


const createProject = async (req, res) => {
    try {
      const {
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date,owner, team, visible_to, location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block,add_size,add_unit,basic_aminities,
        features_aminities,nearby_aminities,price_list,Payment_plan} = req.body;
      
      const pic=req.files ? req.files.map((item=>item.path)):[]
  
      // Simply pass the add_block as it is if no further modification is needed
      const newProject = new addproject({
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date, pic:pic, owner, team, visible_to,location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block,add_size,add_unit,basic_aminities,
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