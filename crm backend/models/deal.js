const mongoose=require('mongoose')

const documentschema = new mongoose.Schema({
    document_name:{type:String},
    document_no:{type:String},
    document_Date:{type:String},
    linkded_contact:{type:String},
    pic:{type:Array},
});


const add_deal=new mongoose.Schema({   
    project_category:{type:Array},
    project_subcategory:{type:Array},   
    location:{type:String},              
    available_for:{type:String},
    stage:{type:String},
    project:{type:String},
    block:{type:String},
    unit_number:{type:String},
    floors:{type:String},
    expected_price:{type:String},
    quote_price:{type:String},
    security_deposite:{type:String},
    maintainence_charge:{type:String},
    rent_escltion:{type:String},
    rent_period:{type:String},
    fitout_perioud:{type:String},
    deal_type:{type:String},
    transaction_type:{type:String},
    source:{type:String},
    white_portion:{type:String},
    team:{type:String},
    user:{type:String},
    visible_to:{type:String},
    owner_details:{type:Array},
    associated_contact:{type:Array},
    relation:{type:String},
    document_details:[documentschema],
    s_no:{type:Array},
    preview:{type:Array},
    descriptions:{type:Array},
    category:{type:Array},
    s_no1:{type:Array},
    url:{type:Array},
    website:{type:String},
    social_media:{type:String},
    send_matchedlead:{type:String},
    matchedleads:{type:Array},
    matchinglead:{type:String},
},{timestamps:true})

const adddeal=mongoose.model('deal',add_deal)
module.exports=adddeal