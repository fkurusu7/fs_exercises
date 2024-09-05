const postsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const User = require("../models/user");
const logger = require("./../utils/logger");
const middleware = require("./../utils/middleware");

// FETCH all Posts

// notesRouter.get("/", (request, response) => {
postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.name);
    next(error);
  }
});

// FETCH a Single Post

// SAVE a Post
// const getTokenFrom = (req) => {
//   const authorization = req.get("authorization");

//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

postsRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  // logger.info("POST REQ: ", req.body);
  // logger.info("POST token: ", req.token);
  try {
    const body = req.body;
    const user = req.user;

    const post = new Post({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
    });

    const savedPost = await post.save();
    user.posts = user.posts.concat(savedPost._id);
    await user.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("ERROR POST: ", error.message);
    console.log("ERROR POST: ", error.name);

    next(error);
  }
});

// UPDATE a Post
postsRouter.put("/:id", middleware.userExtractor, async (req, res, next) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;
  console.log("BODY put: ", req.body);
  const user = req.user;
  console.log("PUT, user: ", user);

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // console.log("POST after updated: ", updatedPost);

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// Delete a Post
postsRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const user = req.user;
    const post = await Post.find({ _id: postId, user: user });

    if (post.length !== 0) {
      const result = await Post.deleteOne({ _id: postId });
      if (result.deletedCount === 1) {
        res.status(204).end();
      } else {
        res.status(400).json({ error: "post not found" });
      }
    } else {
      return res.status(400).json({ error: "Post created by another user" });
    }
    // const result = await Post.deleteOne({ _id: postId, user: userId });
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
