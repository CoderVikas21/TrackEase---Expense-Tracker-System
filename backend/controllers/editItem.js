const List = require("../schema/schema");

async function editItem(req,res){
    try{
        const {name,cost} = req.body;

        const result = await List.findOneAndUpdate(
            { name: name },         
            { cost: cost },
        );

        return res.status(200).json({
            success:true,
            message:"Item updated successfully"
        })

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

module.exports = editItem;