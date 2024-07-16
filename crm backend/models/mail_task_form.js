const mongoose=require('mongoose')

const mail_taskform=new mongoose.Schema({
activity_type:{type:String},
executive:{type:String},
lead:{type:String},
inventory:{type:String},
subject:{type:String},
remarks:{type:String},
remind_me:{type:String},
complete:{type:String},
due_date:{type:String}
},{timestamps:true})

const mailtask_form=mongoose.model('mailtask_form',mail_taskform)
module.exports=mailtask_form