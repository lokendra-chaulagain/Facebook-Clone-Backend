const router = require('express').Router();


//Routes
router.get("/", (req, res) => {
    res.send("Hey its user Route");
})



//to use in index file we export router
module.exports = router;
