const express = require("express"); 
const router = express.Router();        

router.post("/login", registerUser);
router.post("/register", loginUser);

module.exports = router;