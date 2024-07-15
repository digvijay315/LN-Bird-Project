const mongoose=require('mongoose')

const add_developer=new mongoose.Schema({
developer_name:{type:String},
description:{type:String},
address:{type:String},
street:{type:String},
country:{type:String},
state:{type:String},
city:{type:String},
zipcode:{type:String},
salutation:{type:String},
first_name:{type:String},
last_name:{type:String},
phone:{type:String},
email:{type:String},
alternative_phone:{type:String},
alternative_email:{type:String},
designation:{type:String},
pan_number:{type:String},
},{timestamps:true})

const adddeveloper=mongoose.model('add_developer',add_developer)
module.exports=adddeveloper