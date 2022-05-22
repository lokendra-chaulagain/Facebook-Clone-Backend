const mongoose = require("mongoose");

//UserSchema
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 30,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 200,
    },

    // posts: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],

    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
