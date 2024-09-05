const router = require("express").Router();
const User = require("./../models/user");
const Post = require("./../models/post");

router.post("/reset", async (req, res) => {
  await Post.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;
