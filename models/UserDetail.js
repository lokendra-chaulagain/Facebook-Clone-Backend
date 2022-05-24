const mongoose = require("mongoose");

//UserDetailSchema
const userDetailSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      default: "",
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

    bio: {
      type: String,
      default: "",
    },

    currentJobPosition1: {
      type: String,
      default: "",
    },

    currentJobCompany1: {
      type: String,
      default: "",
    },

    currentJobPosition2: {
      type: String,
      default: "",
    },

    currentJobCompany2: {
      type: String,
      default: "",
    },

    founderOf1: {
      type: String,
      default: "",
    },

    founderOf2: {
      type: String,
      default: "",
    },

    currentStudyingCourse: {
      type: String,
      default: "",
    },

    currentStudyingUniversity: {
      type: String,
      default: "",
    },

    graduatedCourse: {
      type: String,
      default: "",
    },

    graduatedUniversity: {
      type: String,
      default: "",
    },

    plus2CompletedCollege: {
      type: String,
      default: "",
    },

    plus2CompletedCollegeLocation: {
      type: String,
      default: "",
    },

    sEECompletedCollege: {
      type: String,
      default: "",
    },

    sEECompletedSchoolLocation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("UserDetail", userDetailSchema);
