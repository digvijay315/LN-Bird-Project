const mongoose=require('mongoose')

const add_product=new mongoose.Schema({
        product_code:{type:String},
        product_name:{type:String},
        product_description:{type:String},
        product_brand:{type:String},
        product_category:{type:String},
        product_subcategory:{type:String},
        product_mrp:{type:String},
        product_sellingprice:{type:String},
        product_discount:{type:String},
        product_stockquantity:{type:String},
        product_nutritionalinformation:{type:Array},
        product_image:{type:Array},
        product_quantity1:{type:String},
   
    
    },{timestamps:true})

const addproduct=mongoose.model('add_product',add_product)
module.exports=addproduct