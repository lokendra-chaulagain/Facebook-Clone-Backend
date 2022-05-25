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


//unFollow user

//export
module.exports = router;
//Follow user
// router.put("/follow/:id", async (req, res) => {
//   //user cant follow himself
//   if (req.body.userId !== req.params.id) {
//     try {
//       //find user which we want to follow
//       const user = await UserDetail.findById(req.params.id);
//       //find currentUser
//       const currentUser = await UserDetail.findById(req.body.userId);

//       //if the user which we are trying to follow already includes the current userId
//       if (!user.followers.includes(req.body.userId)) {
//         //if user not in followers array then add it
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.body.userId } });
//         res.status(200).json("User has been followed");
//       } else {
//         res.status(403).json("You are already following this user");
//       }
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     res.status(403).json("You cant follow yourself");
//   }
// });
