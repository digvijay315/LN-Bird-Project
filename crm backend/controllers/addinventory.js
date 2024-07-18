
const addinventory = require('../models/add_inventory');

const inventory_details=async(req,res)=>
    {
        try {
            const{developer,block_tower,project,unit_number,sub_category,size,project1,facing,road,ownership,type,cluter_details,length,
                    breadth,total_area,in_metrics,occupation_date,age_of_construction,furnish_details,furnished_item,aminities,
                    location,lattitude,langitude,s_no,descriptions,category,s_no1,url,search_contact,relation,document_name,
                    number,date,linkded_contact}=req.body;

                    const preview=req.files
           
                const new_inventory_details= new addinventory({developer,block_tower,project,unit_number,sub_category,size,project1,facing,road,ownership,type,cluter_details,length,
                    breadth,total_area,in_metrics,occupation_date,age_of_construction,furnish_details,furnished_item,aminities,
                    location,lattitude,langitude,s_no,preview:preview,descriptions,category,s_no1,url,search_contact,relation,document_name,
                    number,date,linkded_contact})
            
            const resp=await new_inventory_details.save()
            res.status(200).send({message:"inventory details saved ",inventory_details:resp})
        } catch (error) {
            console.log(error)
        }
    }

    module.exports=inventory_details;