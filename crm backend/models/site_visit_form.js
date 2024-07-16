const mongoose=require('mongoose')

const site_visitform=new mongoose.Schema({
activity_type:{type:String},
executive:{type:String},
project:{type:String},
sitevisit_type:{type:String},
inventory:{type:String},
lead:{type:String},
confirmation:{type:String},
remarks:{type:String},
participants:{type:String},
remind_me:{type:String},
complete:{type:String},
start_date:{type:String},
end_date:{type:String}
},{timestamps:true})

const sitevisit_form=mongoose.model('sitevisit_form',site_visitform)
module.exports=sitevisit_form