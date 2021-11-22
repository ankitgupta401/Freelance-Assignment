const express = require("express");

const { isAuthenticated } = require("../../controllers/user/isAuthenticated");
const router = express.Router();

// Is authenticated
router.get("/is_authenticated", isAuthenticated);

module.exports = router;
