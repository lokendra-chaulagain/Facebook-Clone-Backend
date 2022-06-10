const CoverPic = require("../models/CoverPic");
const createError = require("../utils/error");

//create userPic
const createCoverPic = async (req, res, next) => {
  try {
    const coverPic = new CoverPic(req.body);
    const savedCoverPic = await coverPic.save();
    res.status(200).json(savedCoverPic);
  } catch (error) {
    return next(createError(500, "Server Error while creating coverPic"));
  }
};

//Update coverPic
// const createCoverPic = async (req, res, next) => {
//   const { userID } = req.body;
//   try {
//     const coverPic = await CoverPic.findOneAndUpdate(
//       { userID },
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(coverPic);
//   } catch (error) {
//     return next(createError(500, "Server Error while updating coverPic"));
//   }
// };

//Get coverPic by userID (children)
const getCoverPic = async (req, res, next) => {
  const { userID } = req.body;
  try {
    const getUserID = await CoverPic.find({ userID });
    return (res = res.status(200).json(getUserID));
  } catch (error) {
    return next(createError(500, "Server Error while getting coverPic "));
  }
};

//export
module.exports = {
  createCoverPic,
  getCoverPic,
};
