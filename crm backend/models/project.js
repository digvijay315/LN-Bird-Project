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

  const sizeschema = new mongoose.Schema({
    size_name: {type: String},
    block1: {type:String},
    category: {type: Array },
    sub_category: { type: String},
    total_sealable_area: {type: String},
    sq_feet1: {type: String},
    covered_area: {type: String},
    sq_feet2: {type: String},
    carpet_area: {type: String},
    sq_feet3: {type: String},
    loading: {type: String},
    percentage: {type: String},
    length: {type: String},
    yard1: {type: String},
    bredth: {type: String},
    yard2: {type: String},
    total_area: {type: String},
    yard3: {type: String}
  })

  const unitschema = new mongoose.Schema({
    unit_no: {type: String},
    unit_type: {type:String},
    category: {type: Array },
    block: { type: String},
    size: {type: String},
    direction: {type: String},
    facing: {type: String},
    road: {type: String},
    ownership: {type: String},
    floor: {type: Array},
    cluter_details: {type: Array},
    length: {type: Array},
    bredth: {type: Array},
    total_area: {type: Array},
    measurment2: {type: Array},
    ocupation_date: {type: String},
    age_of_construction: {type: String},
    furnishing_details: {type: String},
    furnished_item: {type: String},
    location: {type: String},
    lattitude: {type: String},
    langitude: {type: String}
  })
  
const priceschema = new mongoose.Schema({
  block:{type:String},
  category:{type:Array},
  sub_category:{type:String},
  size:{type:String},
  covered_area:{type:String},
  base_rate:{type:String},
  name:{type:String},
  type:{type:String},
  calculation_type:{type:String},
  blank1:{type:String},
  blank2:{type:String},
  blank3:{type:String},
  name1:{type:String},
  type1:{type:String},
  calculation_type1:{type:String},
  blank4:{type:String}
});
const paymentschema = new mongoose.Schema({
  payment_planname:{type:String},
  step_name:{type:Array},
  calculation_type:{type:Array},
  blank1:{type:Array},
  blank2:{type:Array},
  blank3:{type:Array},
  condition:{type:String}
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
approved_bank:{type:Array},
approvals:{type:Array},
registration_no:{type:Array},
date:{type:Array},
pic:{type:Array},
owner:{type:Array},
team:{type:Array},
visible_to:{type:String},
add_block:[blockSchema],
add_size:[sizeschema],
add_unit:[unitschema],
basic_aminities:{type:Array},
features_aminities:{type:Array},
nearby_aminities:{type:Array},
price_list:[priceschema],
Payment_plan:[paymentschema]
},{timestamps:true})



                                         
                                         

const addproject=mongoose.model(' project',project)
module.exports=addproject