const addproject = require("../models/project");


const createProject = async (req, res) => {
    try {
      const {
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date,owner, team, visible_to, add_block
      } = req.body;
      
      const pic=req.files ? req.files.map((item=>item.path)):[]
  
      // Simply pass the add_block as it is if no further modification is needed
      const newProject = new addproject({
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date, pic:pic, owner, team, visible_to, add_block
      });
  
      const savedProject = await newProject.save(); // Save the project
      res.status(201).json(savedProject); // Return the saved project
    } catch (error) {
      res.status(500).json({ error: 'Error creating project', message: error.message });
    }
  };
   module.exports=createProject