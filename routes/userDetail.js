const router = require("express").Router();
const UserDetail = require("../models/UserDetail");

//Create userDetail
router.post("/create", async (req, res) => {
  try {
    const userDetail = new UserDetail(req.body);
    const savedUserDetail = await userDetail.save();
    res.status(200).json(savedUserDetail);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get userDetail
router.get("/getUserDetail/:id", async (req, res) => {
  try {
    const userDetail = await UserDetail.findById(req.params.id);
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Find userID from UserDetail //child bata parents fetch garey ko//userID is child and userDetail is parent
router.post("/userDetailData", async (req, res) => {
  const { userID } = req.body;
  try {
    const getUserID = await UserDetail.find({ userID });
    return (res = res.status(200).json(getUserID));
  } catch (error) {
    next(error);
  }
});

//export
module.exports = router;
