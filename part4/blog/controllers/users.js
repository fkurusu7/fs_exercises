const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./../models/user");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

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
    const savedUser = await user.save();
    // save user, return 201 json
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
