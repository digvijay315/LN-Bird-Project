const express=require('express')
const {add_doctor, logindoctor, changePassword} = require('../../controllers/doctor/adddoctor')


const router=express.Router()

router.post('/adddoctor',add_doctor)
router.post('/login',logindoctor)
router.post('/changedpassword',changePassword)





module.exports=router