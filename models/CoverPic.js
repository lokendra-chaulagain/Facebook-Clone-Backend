const mongoose = require("mongoose");

const CoverPicSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },

    coverPic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoverPic", CoverPicSchema);
