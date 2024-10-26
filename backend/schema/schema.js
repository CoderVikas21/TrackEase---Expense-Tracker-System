const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("List" , listSchema);