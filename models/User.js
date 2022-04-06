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
        maxlength:200,
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
    followings: {
        type: Array, //array of userIds
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false, //when user is created it will be normal user by default
    },
    desc:{
        type: String,
        default: "",
        maxlength: 100, 
    },
    city:{
        type: String,
        default: "",
        maxlength: 50,
    },
    from:{
        type: String,
        default: "",
        maxlength: 50,

    },
    relationship:{
        type: Number,
        enum:[1,2,3],
    }

}, { timestamps: true });

//Exporting UserModel
module.exports = mongoose.model("User", UserSchema)
