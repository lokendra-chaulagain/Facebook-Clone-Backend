const mongoose = require("mongoose");

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

    from: {
      type: String,
      default: "",
    },

    currentlyLiving: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetail", userDetailSchema);
