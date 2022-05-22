const mongoose = require("mongoose");

//UserDetailSchema
const userDetailSchema = new mongoose.Schema(
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

    followers: {
      type: Array,
      default: [],
    },

    followings: {
      type: Array,
      default: [],
    },

    profileDesc: {
      type: String,
      default: "",
      maxlength: 100,
    },

    from: {
      type: String,
      default: "",
    },

    currentlyLiving: {
      type: String,
      default: "",
    },

    relationshipStatus: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6],
    },

    nickName: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("UserDetail", userDetailSchema);
