const express = require("express"); 
const { registerUser, loginUser } = require("../controllers/authController");       

const router = express.Router();        

router.post("/login", registerUser);
router.post("/register", loginUser);

module.exports = router;