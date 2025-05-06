const mongoose=require('mongoose')

const add_leadscore=new mongoose.Schema({
    available_for:{type:String},
    reason:{type:String},
    direction:{type:String},
    status:{type:String},
    result:{type:String},
    score:{type:String},

    email_category:{type:String},
    email_direction:{type:String},
    email_status:{type:String},
    email_score:{type:String},
    email_subject:{type:String},
    },{timestamps:true})

const addleadscore=mongoose.model('add_leadscore',add_leadscore)
module.exports=addleadscore