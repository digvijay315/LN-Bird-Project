const mongoose=require('mongoose')

const lead_info=new mongoose.Schema({
title:{type:String},
first_name:{type:String},
last_name:{type:String},
country_code:{type:String},
mobile_no:{type:String},
mobile_type:{type:String},
email:{type:String},
email_type:{type:String},
title_company:{type:String},
designation:{type:String},
company_name:{type:String},
tags:{type:String},
lead_type:{type:String},
descriptions:{type:String},
team:{type:String},
owner:{type:String},
campaign:{type:String},
source:{type:String},
sub_source:{type:String},
stage:{type:String},
channel_partner:{type:String},
intrested_project:{type:String},
},{timestamps:true})

const leadinfo=mongoose.model('leadinfo',lead_info)
module.exports=leadinfo