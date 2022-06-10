const UserPic= require("../models/UserPic");
const createError = require("../utils/error");

//create userPic
const createUserPic = async (req, res, next) => {
  try {
    const userPic = new UserPic(req.body);
    const savedUserPic = await userPic.save();
    res.status(200).json(savedUserPic);
  } catch (error) {
    return next(createError(500, "Server Error while creating userPic"));
  }
};

//Get userPic by userID (children)
const getUserPicByUserID = async (req, res, next) => {
  const { userID } = req.body;
  try {
    const getUserID = await UserPic.find({ userID });
    return (res = res.status(200).json(getUserID));
  } catch (error) {
    return next(createError(500, "Server Error while getting userPic "));
  }
};

//export
module.exports = {
  createUserPic,
  getUserPicByUserID,
};
