const router = require("express").Router();
const {
  createPost,
  updatePost,
  getPost,
  getAllPosts,
  deletePost,
  getUserPostOnly,
} = require("../controllers/postController");
const Post = require("../models/Post");
const User = require("../models/User");

//Create post
router.post("/create", createPost);

//Update post
router.put("/update/:id", updatePost);

//Get a post
router.get("/get/:id", getPost);

//Delete post
router.delete("/delete/:id", deletePost);

//Get all post
router.get("/getAll", getAllPosts);

//get userKo post only
 router.get("/getUserPosts", getUserPostOnly);

//GET ALL TIMELINE POSTS (all friends posts)
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
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

module.exports = router;
