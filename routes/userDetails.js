const router = require("express").Router();
const User = require("../models/User");

const {
  createUserDetail,
  getUserDetailByUserID,
  updateUserDetail,
  getAllUserDetail,
} = require("../controllers/userDetailController");
const UserDetail = require("../models/UserDetail");

//Create userDetail
router.post("/create", createUserDetail);

//Get userDetail by userID
router.post("/userDetailData", getUserDetailByUserID);

//Update userDetail
router.put("/update/:id", updateUserDetail);

//Get all useDetail
router.get("/all", getAllUserDetail);

module.exports = router;
