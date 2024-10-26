const List = require("../schema/schema");

async function addItems(req,res){
    try{
        const {name,cost} = req.body;
        const listData = await List.create({name,cost});
      
        return res.status(200).json({
            success:true,
            message:"Item added successfully"
        })

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

module.exports = addItems;