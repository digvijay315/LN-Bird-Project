const mongoose=require('mongoose')

const site_visitform=new mongoose.Schema({
activity_type:{type:String},
title:{type:String},
executive:{type:String},
project:{type:String},
sitevisit_type:{type:String},
inventory:{type:String},
lead:{type:String},
confirmation:{type:String},
remark:{type:String},
participants:{type:String},
complete:{type:String},
title2:{type:String},
first_name:{type:String},
last_name:{type:String},
mobile_no:{type:String},
email:{type:String}
},{timestamps:true})

const sitevisit_form=mongoose.model('sitevisit_form',site_visitform)
module.exports=sitevisit_form