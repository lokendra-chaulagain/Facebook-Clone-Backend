const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');//its async function


//REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        //generate salt to hash the password
        const salt = await bcrypt.genSalt(10);

        //hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save the user and return the user
        const user = await newUser.save();
        res.status(200).json(user);

        //if error show error
    } catch (error) {
        console.log(error);

    }
})

//to use in index file we export router
module.exports = router;
