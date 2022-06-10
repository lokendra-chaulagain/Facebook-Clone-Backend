const mongoose = require("mongoose");

//UserPic
const UserPicSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    coverPic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPic", UserPicSchema);
