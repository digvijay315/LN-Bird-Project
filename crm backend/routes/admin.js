const express=require('express');
const {add_contact,view_contact, view_contact_ByName, remove_contact} = require('../controllers/contact_details');
const {lead_info,leadinfo_find} = require('../controllers/leadinfo');
const lead_info_personal = require('../controllers/leadinfo_personal');
const upload=require('../middlewares/file');
const {add_developer,view_developer} = require('../controllers/add_developer');
const { add_tower, view_tower } = require('../controllers/add_tower');
const { add_project, view_project } = require('../controllers/add_project');

const router=express.Router()

router.post('/addcontact',add_contact)
router.get('/viewcontact',view_contact)
router.get('/viewcontactbyname/:first_name',view_contact_ByName)
router.delete('/deletecontact/:first_name',remove_contact)

router.post('/leadinfo',lead_info)
router.get('/leadinfo',leadinfo_find)

router.post('/leadinfopersonal',upload.single('file'),lead_info_personal)

router.post('/addproperty/adddeveloper',add_developer)
router.get('/addproperty/viewdeveloper',view_developer)

router.post('/addproperty/addtower',add_tower)
router.get('/addproperty/viewtower',view_tower)

router.post('/addproperty/addproject',add_project)
router.get('/addproperty/viewproject',view_project)

module.exports=router;