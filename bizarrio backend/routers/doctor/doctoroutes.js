const express=require('express')
const {add_doctor, logindoctor, changePassword} = require('../../controllers/doctor/adddoctor')
const upload = require('../../middlewares/siglefile')


const router=express.Router()

router.post('/adddoctor',upload.any('profile_pic'), add_doctor)
router.post('/login',logindoctor)
router.post('/changedpassword',changePassword)





module.exports=router