const router = require("express").Router();
const {
  createCoverPic,
  getCoverPic,
} = require("../controllers/coverPicController");

//Create
router.post("/create", createCoverPic);

//Get
router.get("/getCoverPic", getCoverPic);

module.exports = router;
