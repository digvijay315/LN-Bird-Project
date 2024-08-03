
const addinventory = require('../models/add_inventory');

const inventory_details=async(req,res)=>
    {
        try {
            const{developer,block_tower,project,unit_number,sub_category,size,project1,facing,road,ownership,type,cluter_details,length,
                    breadth,total_area,in_metrics,occupation_date,age_of_construction,furnish_details,furnished_item,aminities,
                    location,lattitude,langitude,s_no,descriptions,category,s_no1,url,search_contact,relation,document_name,
                    number,date,linkded_contact}=req.body;

                    const preview = req.files ? req.files.map(file => file.path) : [];
           
                const new_inventory_details= new addinventory({developer,block_tower,project,unit_number,sub_category,size,project1,facing,road,ownership,type,cluter_details,length,
                    breadth,total_area,in_metrics,occupation_date,age_of_construction,furnish_details,furnished_item,aminities,
                    location,lattitude,langitude,s_no,preview,descriptions,category,s_no1,url,search_contact,relation,document_name,
                    number,date,linkded_contact})
            
            const resp=await new_inventory_details.save()
            res.status(200).send({message:"inventory details saved ",inventory_details:resp})
        } catch (error) {
            console.log(error)
        }
    }
    const view_inventory=async(req,res)=>
        {
            try {
                const resp=await addinventory.find()
                res.status(200).send({message:"inventory details fetch successfully",inventory:resp})
            } catch (error) {
                console.log(error)
            }
        }
        const remove_inventory=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const user=await addinventory.find({_id:_id})
                    if(!user)
                        {
                            return res.send({message:"inventory not found"})
                        }
                    const resp=await addinventory.deleteOne({_id:_id})
                    res.status(200).send({message:"inventory deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }
            const view_inventory_Bydeveloper=async(req,res)=>
                {
                    try {
                        const developer=req.params.developer;
                        const resp= await addinventory.find({developer:developer})
                        if(!resp)
                            {
                               return res.send("inventory details not available")
                            }
                        res.status(200).send({message:"inventory details found :",inventory:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }
                const view_inventory_Bylocation=async(req,res)=>
                    {
                        try {
                            const location=req.params.location;
                            const resp= await addinventory.find({location:location})
                            if(!resp)
                                {
                                   return res.send("inventory details not available")
                                }
                            res.status(200).send({message:"inventory details found :",inventory:resp})
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const update_inventory=async(req,res)=>
                        {
                            try {
                                const id=req.params._id;
                                const inventory=await addinventory.findOne({_id:id})
                                if(!inventory)
                                    {
                                        return res.send({message:"inventory not found"})
                                    }
                                    const preview = req.files && req.files.length > 0 ? req.files.map(file => file.path) : inventory.preview;
                               
                                const updatedFields = {
                                    ...req.body,
                                    preview // Update preview field with new images if provided
                                };
                                const resp = await addinventory.findByIdAndUpdate(id, updatedFields, { new: true });
                                res.status(200).send({message:"inventory update successfully"})
                            } catch (error) {
                                console.log(error)
                            }
                        }

    module.exports={inventory_details,view_inventory,remove_inventory,view_inventory_Bydeveloper,view_inventory_Bylocation,update_inventory};