const router = require('express').Router();
const Post = require('../models/Post');
const User = require("../models/User");


//CREATE A POST
router.post("/newPost", async (req, res) => {
    try {
        //create a post
        const newPost = new Post(req.body)

        //save post
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
            res.status(200).json({ message: "Post has been deleted" })
        }
        else {
            res.status(403).json({ message: "You are not authorized to delete this post" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




//LIKE / DISLIKE A POST 
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET A POST 
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //find post
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error.message)

    }

}
)
//GET ALL TIMELINE POSTS 
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET USER'S ALL POSTS
router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;