const mongoose=require('mongoose')

const meeting_taskform=new mongoose.Schema({
activity_type:{type:String},
executive:{type:String},
lead:{type:String},
location_type:{type:String},
location_address:{type:String},
reason:{type:String},
inventory:{type:String},
remarks:{type:String},
remind_me:{type:String},
complete:{type:String},
due_date:{type:String}
},{timestamps:true})

const meetingtask_form=mongoose.model('meetingtask_form',meeting_taskform)
module.exports=meetingtask_form