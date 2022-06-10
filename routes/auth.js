const router = require("express").Router();
const { userRegister, userLogin } = require("../controllers/authController");

//Register
router.post("/register", userRegister);

//Login
router.post("/login", userLogin);

module.exports = router;
