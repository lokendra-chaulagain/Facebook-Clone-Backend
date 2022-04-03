const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


//REGISTER A USER
router.post("/register", async (req, res) => {
  try {
    //generate salt to hash the password
    const salt = await bcrypt.genSalt(10)

    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    //save the user
    const user = await newUser.save()
    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find by the user email
    const user = await User.findOne({ email: req.body.email })

    //if user exists
    if (user) {
      //check the user password with hassedPassword in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password)

      //if password matched
      if (validPassword) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }

    } else {
      res.status(400).json({ error: "User does not exist" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
