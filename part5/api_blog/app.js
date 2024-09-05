const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

// *******************************
// DATABASE Connection
// *******************************
mongoose.set("strictQuery", false);

logger.info("*******************************");
logger.info("*** Connecting to:", MONGODB_URI);
const ATLAS_STR = "MongoDB Atlas";

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info(`**** Connected to ${ATLAS_STR}`))
  .catch((error) =>
    logger.error(`**** Error connecting to ${ATLAS_STR} - ${error.message}`)
  );

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
morgan.format(
  "mFormat",
  ":method :url :status :response-time ms - :res[content-length] :body"
);
app.use(morgan("mFormat"));
app.use(middleware.tokenExtractor);
// ***********
// ROUTES
app.use("/api/blog/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
