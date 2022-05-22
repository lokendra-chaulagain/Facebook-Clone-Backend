const router = require("express").Router();

const {
  createUserDetail,
  getUserDetailByUserID,
} = require("../controllers/userDetailController");
const UserDetail = require("../models/UserDetail");

//Create userDetail
router.post("/create", createUserDetail);

//Get userDetail by userID
router.post("/userDetailData", getUserDetailByUserID);

//export
module.exports = router;
