const UserDetail = require("../models/UserDetail");

//create userDetail
const createUserDetail = async (req, res, next) => {
  try {
    const userDetail = new UserDetail(req.body);
    const savedUserDetail = await userDetail.save();
    res.status(200).json(savedUserDetail);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get userDetail by userID
const getUserDetailByUserID = async (req, res, next) => {
  const { userID } = req.body;
  try {
    const getUserID = await UserDetail.find({ userID });
    return (res = res.status(200).json(getUserID));
  } catch (error) {
    next(error);
  }
};

//export
module.exports = { createUserDetail, getUserDetailByUserID };