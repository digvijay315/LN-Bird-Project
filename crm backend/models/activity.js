const mongoose=require('mongoose')

const add_activity=new mongoose.Schema({
    activity_name:{type:String},
    call_outcome:{type:String},
    activity_note:{type:String},
    lead:{type:String}
    },{timestamps:true})

const addactivity=mongoose.model('add_activity',add_activity)
module.exports=addactivity