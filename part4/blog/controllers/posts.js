const postsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const User = require("../models/user");
const logger = require("./../utils/logger");

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

postsRouter.post("/", async (req, res, next) => {
  // logger.info("POST REQ: ", req.body);
  // logger.info("POST token: ", req.token);
  try {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    // logger.info(`decodedToken: ${decodedToken}`);
    if (!decodedToken) {
      return res.status(401).json({ error: "invalid token" });
    }

    const user = await User.findById(decodedToken.id);
    // logger.info(`USER: ${user}`);

    const post = new Post({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
    });

    const savedPost = await post.save();
    // console.log("SAVEd Post: ", savedPost);

    user.posts = user.posts.concat(savedPost._id);
    await user.save();
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
