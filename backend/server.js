const express = require("express");
const app = express();

require("dotenv").config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(express.json());

const routes = require("./routes/listRoutes")
app.use("/api/v1" , routes);


const DBConnect = require("./config/database");
DBConnect();

app.get('/',(req,res)=>{
    res.send("Hey! I'm listening")
})

app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}`);
})


