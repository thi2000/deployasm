const express = require("express");
const authcontroller = require("../controller/auth");
const router = express.Router();
router.post("/signup", authcontroller.postSignUp);
router.post("/signin", authcontroller.postLogin);
router.get("/user", authcontroller.postSignUp);
router.get("/users/:name", authcontroller.getUserid);
module.exports = router;
