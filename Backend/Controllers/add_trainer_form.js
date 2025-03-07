const AddTrainer = require('../Modal/add_trainer');

const saveTrainer = async (req, res) => {
    try {
       const { first_name, last_name, specialization, experience, email_id, phone_no } = req.body;
       const addTrainerData = new AddTrainer({first_name, last_name, specialization, experience, email_id, phone_no});
       const response = await addTrainerData.save();
       res.status(200).send({message: 'Trainer add successfully', trainer: response})
    } catch (error) {
        console.log(error);  
    }
}

const getTrainer = async (req, res) => {
    try {
       const response = await AddTrainer.find();
       res.status(200).send({message: 'trainer data get successfully', trainer:response})
    } catch (error) {
        console.log(error);  
    }
}

module.exports = {saveTrainer, getTrainer};