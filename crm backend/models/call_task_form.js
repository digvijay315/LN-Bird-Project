const mongoose=require('mongoose')

const call_taskform=new mongoose.Schema({
activity_type:{type:String},
reason:{type:String},
lead:{type:String},
executive:{type:String},
remarks:{type:String},
remind_me:{type:String},
complete:{type:String},
due_date:{type:String}
},{timestamps:true})

const calltask_form=mongoose.model('calltask_form',call_taskform)
module.exports=calltask_form