const express = require("express");
const {testServer} = require("../controllers/testControllers");
const router = express.Router();


//test api
router.get("/",testServer)



module.exports = router;