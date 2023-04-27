const express = require("express");
const router = express.Router();
const admincontroller = require("../controller/admin");
router.get("/searchadmin", admincontroller.serchAdmin);
module.exports = router;
