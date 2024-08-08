const express=require('express');
const {add_contact,view_contact, view_contact_ByName, remove_contact, update_contact, view_contact_Byemail, view_contact_Bymobile} = require('../controllers/contact_details');
const {lead_info,leadinfo_find, view_lead_Byleadtype, remove_lead, update_lead, view_lead_Byid, view_lead_Bystage, view_lead_Byemail, view_lead_Bymobile} = require('../controllers/leadinfo');
const lead_info_personal = require('../controllers/leadinfo_personal');
const upload=require('../middlewares/file');
const {add_developer,view_developer} = require('../controllers/add_developer');
const { add_tower, view_tower } = require('../controllers/add_tower');
const { add_project, view_project } = require('../controllers/add_project');
const lead_info_requirment = require('../controllers/leadinfo_requirment');
const mail_task_form = require('../controllers/mail_task_form');
const call_task_form = require('../controllers/call_task_form');
const meeting_task_form = require('../controllers/meeting_task_form');
const site_visit_form = require('../controllers/site_visit_form');
const booking_details = require('../controllers/booking_details');
const addpayment_details = require('../controllers/addpayment_details');
const {inventory_details,view_inventory, remove_inventory, view_inventory_Bydeveloper, view_inventory_Bylocation, update_inventory}=require('../controllers/addinventory');


const router=express.Router()

router.post('/addcontact',add_contact)
router.get('/viewcontact',view_contact)
router.get('/viewcontactbyname/:first_name',view_contact_ByName)
router.get('/viewcontactbyemail/:email',view_contact_Byemail)
router.get('/viewcontactbymobile/:mobile_no',view_contact_Bymobile)
router.put('/updatecontact/:_id',update_contact)
router.delete('/deletecontact/:_id',remove_contact)

router.post('/leadinfo',lead_info)
router.get('/leadinfo',leadinfo_find)
router.get('/viewbyleadtype/:lead_type',view_lead_Byleadtype)
router.get('/viewbyid/:_id',view_lead_Byid)
router.delete('/removelead/:_id',remove_lead)
router.put('/updatelead/:_id',update_lead)
router.get('/viewleadbystage/:stage',view_lead_Bystage)
router.get('/viewleadbyemail/:email',view_lead_Byemail)
router.get('/viewleadbymobile/:mobile_no',view_lead_Bymobile)

router.post('/leadinfopersonal',upload.any('file'),lead_info_personal)

router.post('/leadinforequirment',lead_info_requirment)

router.post('/mailtask',mail_task_form)
router.post('/calltask',call_task_form)
router.post('/meetingtask',meeting_task_form)
router.post('/sitevisit',site_visit_form)

router.post('/bookingdetails',booking_details)


router.post('/paymentdetails',upload.any('image'),addpayment_details)

router.post('/inventorydetails',upload.array('preview',10),inventory_details)
router.get('/viewinventory',view_inventory)
router.delete('/removeinventory/:_id',remove_inventory)
router.get('/viewinventorybydeveloper/:developer',view_inventory_Bydeveloper)
router.get('/viewinventorybylocation/:location',view_inventory_Bylocation)
router.put('/updateinventory/:_id',upload.any('preview',10),update_inventory)


router.post('/addproperty/adddeveloper',add_developer)
router.get('/addproperty/viewdeveloper',view_developer)
router.post('/addproperty/addtower',add_tower)
router.get('/addproperty/viewtower',view_tower)
router.post('/addproperty/addproject',add_project)
router.get('/addproperty/viewproject',view_project)

module.exports=router;