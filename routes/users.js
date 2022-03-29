const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); //its async function so we need to use await

//UPDATE USER
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {

        if (req.body.password) {
            try {

                //generate salt to hash the password
                const salt = await bcrypt.genSalt(10);

                //hash the password
                req.body.password = await bcrypt.hash(req.body.password, salt);

                //if error show error
            } catch (error) {
                res.status(500).json({ error });
            }
        }

        //Actual update of the user
        try {

            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");

            //if error show error
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ msg: "You can update only your profile" });
    }
});


//DELETE USER
router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {


        try {

            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");

            //if error show error
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ msg: "You can delete only your profile" });
    }
});



//GET A USER
router.get("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        //this info is not needed to be sent to the client//not showing credentials to user
        const { password, updatedAt, ...others } = user._doc

        res.status(200).json(others);//user if we dont use above line

        //if error show error
    } catch (error) {
        res.status(500).json({ error });
    }


})



























//FOLLOW A USER

//UNFOLLOW A USER

//to use in index file we export router
module.exports = router;
