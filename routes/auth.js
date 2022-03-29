const router = require('express').Router();
const User = require('../models/User');


//REGISTER ROUTE
router.post("/register", async (req, res) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        console.log(error);

    }
})



//to use in index file we export router
module.exports = router;
