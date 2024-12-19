const express=require('express');
const {add_contact,view_contact, view_contact_Byid, remove_contact, update_contact, view_contact_Byemail, view_contact_Bymobile, view_contact_Bytags, view_contact_Bycompany, view_contact_ByName} = require('../controllers/contact_details');
const {lead_info,leadinfo_find, view_lead_Byleadtype, remove_lead, update_lead, view_lead_Byid, view_lead_Bycompany, view_lead_Byemail, view_lead_Bymobile, view_lead_Bystage, update_leadstage, update_leaddocument} = require('../controllers/leadinfo');
const lead_info_personal = require('../controllers/leadinfo_personal');
const upload=require('../middlewares/file');
const {add_developer,view_developer, view_developer_Byid, update_developer, remove_developer} = require('../controllers/add_developer');
const { add_tower, view_tower } = require('../controllers/add_tower');
const add_project = require('../controllers/add_project');
const lead_info_requirment = require('../controllers/leadinfo_requirment');
const {mail_task_form,view_mail} = require('../controllers/mail_task_form');
const {call_task_form,view_call} = require('../controllers/call_task_form');
const {meeting_task_form,viewmeeting_task} = require('../controllers/meeting_task_form');
const {site_visit_form,view_site} = require('../controllers/site_visit_form');
const {booking_details,view_booking} = require('../controllers/booking_details');
const {addpayment_details,view_payment} = require('../controllers/addpayment_details');
const {inventory_details,view_inventory, remove_inventory, view_inventory_Bydeveloper, view_inventory_Bylocation, update_inventory}=require('../controllers/addinventory');
const send_mail = require('../controllers/sendmail');
const {createProject,view_project, view_projectbyname, view_projectbycityname, remove_project, view_project_Byid} = require('../controllers/project');
const { add_deal, view_deal, view_deal_Bystage, remove_deal, update_deal, view_deal_Byid, update_dealbysingle, update_dealbyowner, update_dealbyprojectandunit, view_deal_Byproject } = require('../controllers/add_deal');
 const uploadFields = require('../middlewares/multifile');
const upload1 = require('../middlewares/multifile');


const router=express.Router()

router.post('/addcontact',upload.any('document_pic'),add_contact)
router.get('/viewcontact',view_contact)
router.get('/viewcontactbyid/:_id',view_contact_Byid)
router.get('/viewcontactbyname/:first_name',view_contact_ByName)
router.get('/viewcontactbyemail/:email',view_contact_Byemail)
router.get('/viewcontactbymobile/:mobile_no',view_contact_Bymobile)
router.get('/viewcontactbytags/:tags',view_contact_Bytags)
router.get('/viewcontactbycompany/:company_name',view_contact_Bycompany)
router.put('/updatecontact/:_id',upload.any('document_pic'),update_contact)
router.delete('/deletecontact/:_id',remove_contact)
router.post('/contact/sendmail',upload.array('attachments', 10),send_mail)

router.post('/leadinfo',upload.any('document_pic'),lead_info)
router.get('/leadinfo',leadinfo_find)
router.get('/viewbyleadtype/:lead_type',view_lead_Byleadtype)
router.get('/viewbyid/:_id',view_lead_Byid)
router.delete('/removelead/:_id',remove_lead)
router.put('/updatelead/:_id',upload.any('document_pic'),update_lead)
router.put('/adddocumentinlead/:_id',upload.any('document_pic'),update_leaddocument)
router.put('/updateleadbystage/:_id',update_leadstage)
router.get('/viewleadbycompany/:company_name',view_lead_Bycompany)
router.get('/viewleadbystage/:stage',view_lead_Bystage)
router.get('/viewleadbyemail/:email',view_lead_Byemail)
router.get('/viewleadbymobile/:mobile_no',view_lead_Bymobile)

router.post('/project',upload.any('pic'),createProject)
router.get('/viewproject',view_project)
router.get('/viewprojectbyid/:_id',view_project_Byid)
router.get('/viewprojectbyname/:name',view_projectbyname)
router.get('/viewprojectbycityname/:city',view_projectbycityname)
router.delete('/deleteproject/:_id',remove_project)

router.post('/adddeal',upload.any('preview'),add_deal)
// router.post('/adddeal',uploadFields,add_deal)
router.get('/viewdeal',view_deal)
router.get('/viewdealbyid/:_id',view_deal_Byid)
router.get('/viewdealbystage/:stage',view_deal_Bystage)
router.get('/viewdealbyproject/:project',view_deal_Byproject)
router.delete('/removedeal/:_id',remove_deal)
router.put('/updatedeal/:_id',upload.any('pic','preview'),update_deal)
router.put('/updatedealbysingle/:_id',upload.any('pic','preview'),update_dealbysingle)
router.put('/updatedealbyowner/:_id',update_dealbyowner)
router.put('/updatedealstage/:project/:block/:unit_number',update_dealbyprojectandunit)

router.post('/leadinfopersonal',upload.any('file'),lead_info_personal)

router.post('/leadinforequirment',lead_info_requirment)

router.post('/mailtask',mail_task_form)
router.get('/viewmailtask',view_mail)

router.post('/calltask',call_task_form)
router.get('/viewcalltask',view_call)

router.post('/meetingtask',meeting_task_form)
router.get('/viewmeetingtask',viewmeeting_task)

router.post('/sitevisit',site_visit_form)
router.get('/viesitevisit',view_site)

router.post('/bookingdetails',booking_details)
router.get('/viewbookingdetails',view_booking)


router.post('/paymentdetails',upload.any('image'),addpayment_details)
router.get('/viewpaymentdetails',view_payment)

router.post('/inventorydetails',upload.array('preview',10),inventory_details)
router.get('/viewinventory',view_inventory)
router.delete('/removeinventory/:_id',remove_inventory)
router.get('/viewinventorybydeveloper/:developer',view_inventory_Bydeveloper)
router.get('/viewinventorybylocation/:location',view_inventory_Bylocation)
router.put('/updateinventory/:_id',upload.any('preview',10),update_inventory)


router.post('/addcompany',add_developer)
router.get('/viewcompany',view_developer)
router.get('/viewcompanybyid/:_id',view_developer_Byid)
router.put('/updatecompany/:_id',update_developer)
router.delete('/removecompany/:_id',remove_developer)
router.post('/addproperty/addtower',add_tower)
router.get('/addproperty/viewtower',view_tower)
router.post('/addproperty/addproject')
router.get('/addproperty/viewproject',view_project)

module.exports=router;