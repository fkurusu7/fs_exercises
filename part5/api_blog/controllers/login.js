const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

const User = require("./../models/user");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // find user by username
    const user = await User.findOne({ username });

    // check if password correct compare with bcrypt (password, user.pHash)
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    // if !user !passwordcorrect return 401 invalid user / pw
    // console.log("USER:", user);
    // console.log("PASSWORDs:", password, user.passwordHash, passwordCorrect);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    // object for token {username, id}
    const userForToken = { username: user.username, id: user._id };

    // create token jwt.sign objToken, SECRET {expiresin}
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    // return 200 {token, username, name}
    res.status(200).send({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
