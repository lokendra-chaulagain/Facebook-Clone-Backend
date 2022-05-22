const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Register
const userRegister = async (req, res, next) => {
  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Login
const userLogin = async (req, res, next) => {
  try {
    //find by email
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

        //saving token in cookies
        const { password, ...others } = user._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ others, token });
      } else {
        res.status(400).json("Invalid Password");
      }
    } else {
      res.status(400).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//export
module.exports = { userRegister, userLogin };
