const mongoose=require('mongoose')

const add_leadscore=new mongoose.Schema({
    reason:{type:String},
    direction:{type:String},
    status:{type:String},
    result:{type:String},
    score:{type:String},
    },{timestamps:true})

const addleadscore=mongoose.model('add_leadscore',add_leadscore)
module.exports=addleadscore