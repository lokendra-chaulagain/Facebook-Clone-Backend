const UserDetail = require("../models/UserDetail");
const createError = require("../utils/error");

//create userDetail
const createUserDetail = async (req, res, next) => {
  try {
    const userDetail = new UserDetail(req.body);
    const savedUserDetail = await userDetail.save();
    res.status(200).json(savedUserDetail);
  } catch (error) {
    return next(createError(500, "Server Error while creating userDetail"));
  }
};

//Get userDetail by userID (children)
const getUserDetailByUserID = async (req, res, next) => {
  const { userID } = req.body;
  try {
    const getUserID = await UserDetail.find({ userID });
    return (res = res.status(200).json(getUserID));
  } catch (error) {
    return next(createError(500, "Server Error while getting userDetail "));
  }
};

//update
const updateUserDetail = async (req, res, next) => {
  try {
    const updatedUserDetail = await UserDetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(updatedUserDetail);
  } catch (error) {
    return next(createError(500, "Server Error while updating userDetail "));
  }
};

//get all
const getAllUserDetail = async (req, res, next) => {
  try {
    const allUserDetail = await UserDetail.find();
    res.status(200).json(allUserDetail);
  } catch (error) {
    return next(createError(500, "Server Error while getting all userDetail "));
  }
};

module.exports = {
  createUserDetail,
  getUserDetailByUserID,
  updateUserDetail,
  getAllUserDetail,
};
