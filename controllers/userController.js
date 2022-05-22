const User = require("../models/User");
const createError = require("../utils/error");

//Update
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    return next(createError(500, "Server Error while updating user"));
  }
};

//Get
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return next(createError(500, "Server Error while getting user"));
  }
};

//GetAll
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return next(createError(500, "Server Error while getting all users"));
  }
};

//Delete
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    return next(createError(500, "Server Error while deleting user"));
  }
};

//export
module.exports = { updateUser, getUser, getAllUsers, deleteUser };
