const mongoose = require("mongoose");

//UserSchema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200,//bcrypt might be more than 200
        trim: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array, //array of userIds
        default: [],
    },
    following: {
        type: Array, //array of userIds
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false, //when user is created it will be normal user by default
    },
}, { timestamps: true });

//Exporting UserModel
module.exports = mongoose.model("User", UserSchema)
