const express = require("express"); 
const authMiddleware = require("../middleware/authMiddleware");         
const router = express.Router();    

router.use(authMiddleware);
router.get("/",getTask);
router.post("/",addTask);
router.delete("/:id",deleteTask);

module.exports = router;

