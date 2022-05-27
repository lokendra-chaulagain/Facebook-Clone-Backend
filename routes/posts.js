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

//Get user's posts only
router.post("/getUserPosts", async (req, res) => {
  const { userID } = req.body;
  try {
    const userPosts = await Post.find({ userID });
    res.status(200).json(userPosts);
  } catch (error) {
    return next(createError(500, "Server Error while getting user's posts"));
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

//Get bookMarkPosts from id
router.get("/bookmarkPosts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
