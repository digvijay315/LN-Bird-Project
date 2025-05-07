
const addleadscore = require('../models/leadscore');



const add_leadscore = async (req, res) => {
    try {

    const {available_for,reason,direction,status,result,score,
            email_category,email_direction,email_status,email_score,email_subject,
            meeting_reason,meeting_status,meeting_result,meeting_score,
            leadstage,dealstage,stage_requirment
    } = req.body;   
   

      const newadd_leadscore = new addleadscore({available_for,reason,direction,status,result,score,
        email_category,email_direction,email_status,email_score,email_subject,
        meeting_reason,meeting_status,meeting_result,meeting_score,
        leadstage,dealstage,stage_requirment
      });
  
      // Save the deal to the database
      const resp = await newadd_leadscore.save();
      res.status(200).send({ message: 'Lead Score Criteria added successfully', score: resp });
  
    } catch (error) {
      console.error('Error adding lead criteria:', error);
      res.status(500).send({ message: 'Error occurred while adding lead score', error: error.message });
    }
  };


    const view_leadscore=async(req,res)=>
        {
            try {
                const resp=await addleadscore.find() 
                res.status(200).send({message:"lead score criteria details fetch successfully",score:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const delete_leadscore=async(req,res)=>
            {
                try {
                  
                    const id=req.params._id
                    const resp=await addleadscore.findByIdAndDelete({_id:id}) 
                    res.status(200).send({message:"lead score criteria delete successfully",score:resp})
                } catch (error) {
                    console.log(error)
                }
            }
                              
                 


    
    module.exports={add_leadscore,view_leadscore,delete_leadscore};