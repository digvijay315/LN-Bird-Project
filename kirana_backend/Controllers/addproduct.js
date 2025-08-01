const addproduct = require('../Modals/product');
const cloudinary=require('cloudinary').v2

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const add_product = async (req, res) => {
    try {
        const { 
            product_code,
            product_name,
            product_description,
            product_brand,
            product_category,
            product_subcategory,
            product_mrp,
            product_sellingprice,
            product_discount,
            product_stockquantity,
            product_nutritionalinformation,
            product_quantity1,
           
            
        } = req.body;


        // 'req.files' will contain the uploaded files
         const newDocumentPic = [];

        if (req.files) {
            // Upload files to Cloudinary and get the URLs
            for (let file of req.files) {
              const result = await cloudinary.uploader.upload(file.path);
              newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
              // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
              // fs.unlinkSync(file.path);
            }
          }
// console.log(req.files);

        // Create a new contact with the uploaded Cloudinary URLs
        const newAddproduct = new addproduct({
           
            product_code,
            product_name,
            product_description,
            product_brand,
            product_category,
            product_subcategory,
            product_mrp,
            product_sellingprice,
            product_discount,
            product_stockquantity,
            product_nutritionalinformation,
            product_quantity1,
            product_image:newDocumentPic,
        });

        // Save to database
        const resp = await newAddproduct.save();
        res.status(200).send({ message: "product saved", user: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving product", error });
    }
};

const viewproduct= async(req,res)=>
{
    try {
        const resp=await addproduct.find()
        res.status(200).send({message:"product data fetch",product:resp})
    } catch (error) {
        console.log(error);
        
    }
}

const viewproductbyid= async(req,res)=>
  {
      try {
        const id=req.param._id
          const resp=await addproduct.findOne(id)
          res.status(200).send({message:"product data fetch",product:resp})
      } catch (error) {
          console.log(error);
          
      }
  }

const delete_product = async (req, res) => {
    try {
      const id  = req.params._id; // Get product ID from URL parameter
  
      // Find the product by ID and delete it
      const deletedProduct = await addproduct.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      res.status(200).send({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send({ message: "Failed to delete product", error });
    }
  };


  const edit_product = async (req, res) => {
    try {
        const id = req.params._id; // Get product ID from URL parameter
        const updatedData = req.body; // Get updated data from the request body
        console.log(req.body);
        

        // If there are new files, upload them to Cloudinary
        if (req.files) {
            const newDocumentPic = [];
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                newDocumentPic.push(result.secure_url);
            }
            updatedData.product_image = newDocumentPic; // Update the product image field
        }

        // Find the product by ID and update it
        const updatedProduct = await addproduct.findByIdAndUpdate(
            id, // Find product by ID
            updatedData, // Fields to update
            { new: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send({
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({ message: 'Failed to update product', error });
    }
};


  
module.exports={add_product,viewproduct,delete_product,edit_product,viewproductbyid};