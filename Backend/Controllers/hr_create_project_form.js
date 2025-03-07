const Project = require('../Modal/hr_create_project');
const EmployeeInfo = require('../Modal/employee_register'); 
const ProjectApproval = require('../Modal/project_approvals');

// const saveProject = async (req, res) => {
//     try {
//         const project = new Project(req.body);
//         await project.save();
//         res.status(201).json(project);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

const saveProject = async (req, res) => {
    try {
        // Find the tender department employee
        const tenderEmployee = await EmployeeInfo.findOne({ 
            employee_id: req.body.tenderDept 
        });
        
        // Find the contract manager employee
        const contractEmployee = await EmployeeInfo.findOne({ 
            employee_id: req.body.contractManager 
        });

        if (!tenderEmployee || !contractEmployee) {
            return res.status(400).json({ 
                error: "One or both employees not found" 
            });
        }

        // Create new project with employee references
        const project = new Project({
            name: req.body.name,
            code: req.body.code,
            region: req.body.region,
            category: req.body.category,
            tenderDept: {
                employeeId: tenderEmployee.employee_id,
                _id: tenderEmployee._id
            },
            contractManager: {
                employeeId: contractEmployee.employee_id,
                _id: contractEmployee._id
            },
            matrix: req.body.matrix
        });

        // Save the project first
        const savedProject = await project.save();

        // Create the initial approval record
        await createProjectApproval(
            savedProject._id,  // The MongoDB _id of the newly created project
            tenderEmployee.employee_id  // The tender department employee's ID
        );

        // Send back the saved project data
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(400).json({ error: error.message });
    }
};

const createProjectApproval = async (projectId, tenderDeptId) => {
    const approval = new ProjectApproval({
      projectId,
      currentStatus: 'PENDING_TENDER',
      tenderDeptResponse: {
        employeeId: tenderDeptId,
        status: 'PENDING'
      },
      contractManagerResponse: {
        status: 'PENDING'
      }
    });
    return await approval.save();
  };

const getProject = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('tenderDept._id contractManager._id');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const getEmployeeProjects = async (req, res) => {
//     try {
//         const employeeId = req.params.employeeId;
        
//         // Find projects where the employee is either tender dept or contract manager
//         const projects = await Project.find({
//             $or: [
//                 { tenderDept: employeeId },
//                 { contractManager: employeeId }
//             ]
//         });
        
//         res.status(200).json({
//             message: "Projects fetched successfully",
//             projects: projects
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const getEmployeeProjects = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        
        // Find the employee to get their MongoDB _id
        const employee = await EmployeeInfo.findOne({ 
            employee_id: employeeId 
        });

        if (!employee) {
            return res.status(404).json({ 
                error: "Employee not found" 
            });
        }

        // Find projects where the employee is either tender dept or contract manager
        const projects = await Project.find({
            $or: [
                { 'tenderDept._id': employee._id },
                { 'contractManager._id': employee._id }
            ]
        }).populate('tenderDept._id contractManager._id');
        
        res.status(200).json({
            message: "Projects fetched successfully",
            projects: projects
        });
    } catch (error) {
        console.error('Error fetching employee projects:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateProjectMatrix = async (req, res) => {
    try {
        const { projectId, matrixValues } = req.body;
        
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the matrix values in the project's rows
        project.matrix.rows = project.matrix.rows.map((row, rowIndex) => {
            return {
                ...row,
                values: row.values.map((_, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    return matrixValues[key] || '';
                })
            };
        });

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { saveProject, createProjectApproval, getProject, updateProjectMatrix, getEmployeeProjects };