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
      default: "",
    },

    desc: {
      type: String,
      max: 500,
    },

    img: {
      type: String,
      default: "",
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
