const List = require("../schema/schema");

async function fetchItem(req,res){
    try{
        const result = await List.find({});

        return res.status(200).json({
            success:true,
            data : result,
            message:"Item fetched successfully"
        })

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

module.exports = fetchItem;