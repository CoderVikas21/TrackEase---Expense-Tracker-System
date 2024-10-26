const express = require("express");

const routes = express.Router();


const addItems = require("../controllers/addItems");
const deleteItem = require("../controllers/deleteItem");
// const editItem = require("../controllers/editItem");
const fetchItem = require("../controllers/fetchItem");

routes.post("/additems" , addItems);
routes.post("/deleteItem" , deleteItem);
// routes.post("/editItem" , editItem)
routes.get("/fetchitem" , fetchItem);


module.exports = routes;