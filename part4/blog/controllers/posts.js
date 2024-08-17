const postsRouter = require("express").Router();
const Post = require("../models/post");
const logger = require("./../utils/logger");

// FETCH all Posts

// notesRouter.get("/", (request, response) => {
postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

// FETCH a Single Post

// SAVE a Post
postsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  console.log("BODY\n", body);

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedPost = await post.save();
  res.status(201).json(savedPost);
});

// Delete a Post

// UPDATE a Post

module.exports = postsRouter;
