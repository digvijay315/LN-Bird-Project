const mongoose=require('mongoose')

const blockSchema = new mongoose.Schema({
    block_name: {type: String},
    category: {type:Array},
    sub_category: {type: String },
    land_area: { type: String},
    measurment: {type: String},
    total_blocks: {type: String},
    total_floors: {type: String},
    total_units: {type: String},
    status: {type: String},
    launched_on: {type: Date},
    expected_competion: {type: Date},
    possession: {type: Date},
    parking_type: {type: String},
    rera_no: {type: String}
  });

const project=new mongoose.Schema({
name:{type:String},
developer_name:{type:String},
joint_venture:{type:String},
secondary_developer:{type:String},
rera_number:{type:String},
descriptions:{type:String},
category:{type:Array},
sub_category:{type:Array},
land_area:{type:Array},
measurment1:{type:String},
total_block:{type:String},
total_floor:{type:String},
total_units:{type:String},
status:{type:String},
launched_on:{type:String},
expected_competion:{type:String},
possession:{type:String},
parking_type:{type:String},
approved_bank:{type:String},
approvals:{type:Array},
registration_no:{type:Array},
date:{type:Array},
pic:{type:Array},
owner:{type:String},
team:{type:String},
visible_to:{type:String},
add_block:[blockSchema]
},{timestamps:true})



                                         
                                         

const addproject=mongoose.model(' project',project)
module.exports=addproject