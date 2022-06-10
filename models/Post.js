const mongoose = require("mongoose");

//PostSchema
const PostSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: null,
    },

    desc: {
      type: String,
      max: 500,
      required: true,
    },

    img: {
      type: String,
      default: null,
      required: true,
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//Exporting PostModel
module.exports = mongoose.model("Post", PostSchema);
