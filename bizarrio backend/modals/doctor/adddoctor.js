const mongoose=require('mongoose')

const adddoctorschema=new mongoose.Schema({
  profile_pic:{type:Array},
  country: {type:String},
  firstName: {type:String},
  lastName: {type:String},
  address: {type:String},
  address2: {type:String},
  state: {type:String},
  city: {type:String},
  postalCode: {type:String},
  dateOfBirth: {type:String},
  phone_no: {type:String},
  gender: {type:String},
  email: {type:String},
  website: {type:String},
  password: {type:String},
  confirmPassword: {type:String},
  subscription: {type:Array},
  bio: {type:String},
  ischangedpassword:{type:Boolean,default:"true"},
},{timestamps:true})

const adddoctormodal=mongoose.model('adddoctor',adddoctorschema)

module.exports=adddoctormodal