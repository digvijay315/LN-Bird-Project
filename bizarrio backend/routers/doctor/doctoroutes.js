const express=require('express')
const {add_doctor, logindoctor, changePassword, viewdoctor} = require('../../controllers/doctor/adddoctor')
const upload = require('../../middlewares/siglefile')
const { add_course, viewcourse, viewcoursebyuserid } = require('../../controllers/doctor/createcourse')
const { add_digitalcme, viewcme } = require('../../controllers/doctor/createdigitalcme')


const router=express.Router()

// ======================================adding docotr routes===========================================

router.post('/adddoctor',upload.any('profile_pic'), add_doctor)
router.get('/getalldoctor',viewdoctor)
router.post('/login',logindoctor)
router.post('/changedpassword',changePassword)



// ===========================creating course route===============================================

router.post('/createcourse',upload.any('course_image'), add_course)
router.get('/getcourse',viewcourse)
router.get('/getcoursebyuserid/:user_id',viewcoursebyuserid)


//=========================== digital cme routes==========================================

router.post('/createdigitalcme',upload.any('image_gallary'), add_digitalcme)
router.get('/getcme',viewcme)



module.exports=router