const mongoose = require("mongoose");

require("dotenv").config();

function DBConnect(){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connected Successfully");
    })
    .catch((e)=>{
        console.log("Connection unsuccessfull" , e.message);
    })
}

module.exports = DBConnect

