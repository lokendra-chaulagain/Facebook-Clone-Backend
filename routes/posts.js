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
router.put("/:id", async (req, res) => { //post id

    try {

        const post = await Post.findById(req.params.id) //find the post by id
        //check the owner of the post
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json({ message: "Post updated" })
        }
        else {
            res.status(403).json({ message: "You are not authorized to update this post" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})


//DELETE A POST
router.delete("/:id", async (req, res) => { //post id

    try {

        const post = await Post.findById(req.params.id) //find the post by id
        //check the owner of the post
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json({ message: "Post has neen delted" })
        }
        else {
            res.status(403).json({ message: "You are not authorized to delete this post" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})













//LIKE A POST 



//GET A POST 


//GET TIMELINE POSTS 







module.exports = router;