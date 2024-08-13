// TODO test DB connection and functionality
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("pass password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0-fs.qnjdn.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0-FS`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

// ***************************
// QUERIES: ******************
// ***************************

const method = process.argv[3];
// FIND all
if (method === "findAll") {
  Blog.find({}).then((posts) => {
    posts.forEach((post) => {
      console.log(" ==> ", post);
    });
    mongoose.connection.close();
  });
}

// FIND one - id as param
if (method === "findOne") {
  const id = process.argv[4];
  Blog.find({ id }).then((post) => {
    console.log(" ==> ", post);
    mongoose.connection.close();
  });
}

// Save - parmas: title, author, url, likes
if (method === "savePost") {
  const title = process.argv[4];
  const author = process.argv[5];
  const url = process.argv[6];
  const likes = process.argv[7];
  const blogPost = new Blog({ title, author, url, likes });

  blogPost.save().then((savedPost) => {
    console.log("Blog post saved: \n", savedPost);
    mongoose.connection.close();
  });
}
