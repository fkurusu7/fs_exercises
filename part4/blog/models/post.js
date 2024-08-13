const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: 6,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minLength: 3,
  },
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  likes: Number,
});

postSchema.set("toJSON", {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});

module.exports = mongoose.model("Post", postSchema);
