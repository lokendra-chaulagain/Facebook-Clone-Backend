const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const createError = require("../utils/error");

//Register
const userRegister = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } else {
      next(createError(400, "User already exist"));
    }
  } catch (error) {
    return next(createError(500, "Server Error"));
  }
};

//Login
const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //if user exist check password
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      //if password matched create token
      if (validatePassword) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        const { password, ...others } = user._doc;
        //saving token in cookies
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json( others );
      } else {
        return next(createError(401, "Invalid Password"));
      }
    } else {
      return next(createError(404, "User not found"));
    }
  } catch (error) {
    return next(createError(500, "Server Error"));
  }
};

module.exports = { userRegister, userLogin };
