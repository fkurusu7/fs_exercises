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
postsRouter.post("/", (req, res, next) => {
  const body = req.body;

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  post
    .save()
    .then((postSaved) => res.status(201).json(postSaved))
    .catch((error) => next(error)); // type: ValidationError
});

// Delete a Post

// UPDATE a Post

module.exports = postsRouter;
