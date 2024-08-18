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

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

// Delete a Post
postsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Post.findOneAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// UPDATE a Post
postsRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
