const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  // console.log("Token Ext: ", authorization);

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
    // console.log("body: ", req.body);
    // logger.info("token: ", req.token);
  }

  next();
};

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    // logger.info("USer from token: ");
    // logger.info(decodedToken);
    const user = await User.findById(decodedToken.id);
    // logger.info(`MW, User: ${user}`);
    req.user = user;
    // logger.info(`REQ user: ${req.user}`);
    next();
  } catch (error) {
    next(error);
  }
};

const errorHandler = (error, req, res, next) => {
  // console.log(error.name);
  // console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  } else {
    // Handle any other errors
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
  next(error);
};

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
};
