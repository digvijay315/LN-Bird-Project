const adddoctormodal = require('../../modals/doctor/adddoctor')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

require('dotenv')

const add_doctor = async (req, res) => {
    try {
    const {country,firstName,lastName,address,address2,state,city,postalCode,dateOfBirth,phone_no,
            gender,email,website,password,subscription,bio} = req.body;
   
      const exitingprofile=await adddoctormodal.findOne({email:email})
      if(exitingprofile)
      {
        res.status(400).send({message:"This Email id already exist..."})
        return
      }
        const hashedPassword = await bcrypt.hash(password, 10);

      const new_add_doctor = new adddoctormodal({
       country,firstName,lastName,address,address2,state,city,postalCode,dateOfBirth,phone_no,
            gender,email,website,password:hashedPassword,subscription,bio
      });
  
      // Save the deal to the database
      const resp = await new_add_doctor.save();
      res.status(200).send({ message: 'Doctor Profile added successfully', doctor: resp });
  
    } catch (error) {
      console.error('Error adding doctor profile:', error);
      res.status(500).send({ message: 'Error occurred while adding doctor profile', error: error.message });
    }
  };



const logindoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adddoctormodal.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ID not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(400).json({ message: "Password not matched" });
    }

    if (user.ischangedpassword) {
      return res.status(403).json({ message: "Please change your password first" });
    }

    const payload = {
      id: user._id,
      firstName: user.firstName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.firstName,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await adddoctormodal.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("Old password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.ischangedpassword = false; // Optional: reset the flag
    await user.save();

    res.status(200).send("Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).send("Internal Server Error");
  }
};



  module.exports={add_doctor,logindoctor,changePassword}