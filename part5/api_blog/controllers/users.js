const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./../models/user");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("posts", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  // console.log("POST: ", req.body);

  if (password.length <= 3) {
    return res
      .status(400)
      .json({ error: "Invalid Password, it must be at least 3 chars" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    // create user from User model
    const user = new User({
      username,
      name,
      passwordHash,
    });
    // console.log("USER obj: ", user);

    const savedUser = await user.save();
    // console.log("USER saved: ", savedUser);
    // save user, return 201 json
    res.status(201).json(savedUser);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
