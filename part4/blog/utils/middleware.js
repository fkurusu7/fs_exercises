const logger = require("./logger");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else {
    // Handle any other errors
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
