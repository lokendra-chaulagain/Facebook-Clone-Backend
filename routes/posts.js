const router = require('express').Router();
const Post = require('../models/Post');

//CREATE A POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})



















//UPDATE A POST


//DELETE A POST

//LIKE A POST 



//GET A POST 


//GET TIMELINE POSTS 







module.exports = router;