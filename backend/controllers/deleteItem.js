const List = require("../schema/schema");

async function deleteItem(req,res){
    try{
        const {name} = req.body;

        const result = await List.findOneAndDelete({name:name});

        return res.status(200).json({
            success:true,
            message:"Item deleted successfully"
        })

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

module.exports = deleteItem;