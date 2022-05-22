const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
const userRegister = async (req, res, next) => {
  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //create new user
    const newUser = new User({
      fullName: req.body.fullName,
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

      //if matched
      if (validatePassword) {
        res.status(200).json(user);
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
module.exports = {userRegister, userLogin};
