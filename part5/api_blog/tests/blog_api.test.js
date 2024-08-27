const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const Post = require("./../models/post");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("./../app");
const { log } = require("node:console");
const api = supertest(app);

const POSTS_BASE_PATH = "/api/blog/posts";
const LOGIN_BASE_PATH = "/api/login";

describe("There is initially some posts saved", () => {
  beforeEach(async () => {
    await Post.deleteMany();
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "before", passwordHash });
    await user.save();
    // console.log(`==> Test DB cleared.`);
    for (const post of helper.initialPosts) {
      post.user = user.id;
      const postObj = new Post(post);
      await postObj.save();
      // console.log(`==> Post saved: ${postObj.title}`);
    }
    // console.log(`==> Test DB setup done.`);
  });

  describe("GET notes", () => {
    test("should return posts in JSON format", async () => {
      await api
        .get(POSTS_BASE_PATH)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("should validate the unique identifier of any post be called id, not _id", async () => {
      const post = await helper.postsInDB();
      const keys = Object.keys(post[0]);
      assert(keys.includes("id"));
    });
  });

  describe("Create Posts", () => {
    let userFromToken = {};
    beforeEach(async () => {
      await User.deleteMany();
      const passwordHash = await bcrypt.hash("password", 10);
      const newUserObj = new User({
        username: "root",
        name: "Fkurusu",
        passwordHash,
      });
      await newUserObj.save();
      const loginObj = {
        username: "root",
        password: "password",
      };
      const loginRes = await api.post(LOGIN_BASE_PATH).send(loginObj);
      userFromToken = loginRes.body;
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
      await api
        .post(POSTS_BASE_PATH)
        .set("Authorization", `Bearer ${userFromToken.token}`)
        .send(newPost)
        .expect(201);
      currentPosts = await helper.postsInDB();
      const expected = currentPosts.length;
      assert.strictEqual(actual, expected);
    });

    test("should verify the likes prop if missing the default value is 0", async () => {
      const newPostWithoutLikes = {
        title: "new post test",
        author: "lucho",
        url: "url://",
      };

      await api
        .post(POSTS_BASE_PATH)
        .set("Authorization", `Bearer ${userFromToken.token}`)
        .send(newPostWithoutLikes)
        .expect(201)
        .then((res) => assert.strictEqual(res.body.likes, 0));
    });

    test("should verify the backend responds 400 Bad Request if title or url props are missing", async () => {
      const newPostWithoutLikes = {
        author: "lucho",
        url: "url://",
      };

      await api
        .post(POSTS_BASE_PATH)
        .set("Authorization", `Bearer ${userFromToken.token}`)
        .send(newPostWithoutLikes)
        .expect(400)
        .then((res) => console.log(res.body));
    });

    test("should return status code 401 Unauthorized if token not provided", async () => {
      const newPost = {
        title: "new post test",
        author: "lucho",
        url: "url://",
        likes: 3,
      };

      await api
        .post(POSTS_BASE_PATH)
        .set("Authorization", "Bearer 4s5d6rf7tv8byn9u")
        .send(newPost)
        .expect(401)
        .then((res) => assert.deepEqual(res.body, { error: "token invalid" }));
    });
  });

  describe("Delete Posts", () => {
    test("should delete a Post", async () => {
      const actualPosts = await helper.postsInDB();
      const actual = actualPosts.length;
      const postToDelete = actualPosts[0];
      console.log("DELETE: ", postToDelete);

      await api.delete(`${POSTS_BASE_PATH}/${postToDelete.id}`).expect(204);
      const expectedPosts = await helper.postsInDB();
      const expected = expectedPosts.length;
      assert.strictEqual(actual - 1, expected);
    });

    test("should delete a Post and return 204 code status", async () => {
      const actualPosts = await helper.postsInDB();
      const id = actualPosts[0].id;
      await api.delete(`${POSTS_BASE_PATH}/${id}`).expect(204);
    });
  });

  describe("Update Posts", async () => {
    let loggedInUser = null;
    beforeEach(async () => {
      await User.deleteMany();
      const passwordHash = await bcrypt.hash("password", 10);
      const newUserObj = new User({
        username: "kurusu",
        name: "ferunando",
        passwordHash,
      });

      const loginObj = {
        username: "kurusu",
        password: "password",
      };
      const loginRes = await api.post(LOGIN_BASE_PATH).send(loginObj);
      loggedInUser = loginRes.body;
    });

    test("should update author", async () => {
      const posts = await helper.postsInDB();
      const postUpdateAuthor = posts[0];
      const newAuthorName = "Feliciano";
      postUpdateAuthor.author = newAuthorName;

      const updatedPost = await api
        .put(`${POSTS_BASE_PATH}/${postUpdateAuthor.id}`)
        .send(postUpdateAuthor)
        .expect(200);

      assert.strictEqual(updatedPost.body.author, newAuthorName);
    });

    test.only("should update likes", async () => {
      const posts = await helper.postsInDB();
      console.log("POSTS in DB: ", posts);
      const postUpdateLikes = posts[1];
      console.log("POST before updating: \n ", postUpdateLikes);
      postUpdateLikes.likes = postUpdateLikes.likes + 1;
      console.log("POST after updating: \n ", postUpdateLikes);

      const updatedPost = await api
        .put(`${POSTS_BASE_PATH}/${postUpdateLikes.id}`)
        .send(postUpdateLikes)
        .expect(200);

      assert.strictEqual(updatedPost.body.likes, 4);
    });

    test("should not update if post do not exist", async () => {
      const postUpdate = {
        title: "no post",
        author: "no update",
        url: "http://noupdate.com",
        likes: 1,
      };
      const id = await helper.nonExistingID();
      await api
        .put(`${POSTS_BASE_PATH}/${id}`)
        .send(postUpdate)
        .expect(404)
        .expect("Content-Type", /application\/json/);
      // // Check the response body
      // .expect((res) => res.body)
      // .toHaveProperty("error")
      // .expect((res) => res.body.error)
      // .toBe("Post not found");
    });
  });
});

after(async () => await mongoose.connection.close());
