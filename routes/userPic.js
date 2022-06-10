const router = require("express").Router();
const {
  createUserPic,
  getUserPicByUserID,
} = require("../controllers/userPicController");

//Create
router.post("/create", createUserPic);

//Get
router.get("/getUserPic", getUserPicByUserID);

module.exports = router;
