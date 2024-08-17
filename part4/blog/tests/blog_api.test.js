const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Post = require("./../models/post");
const helper = require("./test_helper");
const app = require("./../app");
const api = supertest(app);

const BASE_PATH = "/api/blog/posts";

beforeEach(async () => {
  await Post.deleteMany();
  console.log(`==> Test DB cleared.`);
  for (const post of helper.initialPosts) {
    const postObj = new Post(post);
    await postObj.save();
    console.log(`==> Post saved: ${postObj.title}`);
  }
  console.log(`==> Test DB setup done.`);
});

test("should return posts in JSON format", async () => {
  await api
    .get(BASE_PATH)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("should validate the unique identifier of any post be called id, not _id", async () => {
  const post = await helper.postsInDB();
  const keys = Object.keys(post[0]);
  assert(keys.includes("id"));
});

test("should create a new post", async () => {
  let currentPosts = await helper.postsInDB();
  const actual = currentPosts.length + 1;
  const newPost = {
    title: "new post test",
    author: "lucho",
    url: "url://",
    likes: 3,
  };
  await api.post(BASE_PATH).send(newPost).expect(201);
  currentPosts = await helper.postsInDB();
  const expected = currentPosts.length;
  assert.strictEqual(actual, expected);
});

test.only("should verify the likes prop if missing the default value is 0", async () => {
  const newPostWithoutLikes = {
    title: "new post test",
    author: "lucho",
    url: "url://",
  };

  await api
    .post(BASE_PATH)
    .send(newPostWithoutLikes)
    .expect(201)
    .then((res) => assert.strictEqual(res.body.likes, 0));
});

after(async () => await mongoose.connection.close());
