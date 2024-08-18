const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Post = require("./../models/post");
const helper = require("./test_helper");
const app = require("./../app");
const api = supertest(app);

const BASE_PATH = "/api/blog/posts";

describe("There is initially some posts saved", () => {
  beforeEach(async () => {
    await Post.deleteMany();
    // console.log(`==> Test DB cleared.`);
    for (const post of helper.initialPosts) {
      const postObj = new Post(post);
      await postObj.save();
      // console.log(`==> Post saved: ${postObj.title}`);
    }
    // console.log(`==> Test DB setup done.`);
  });

  describe("GET notes", () => {
    test.only("should return posts in JSON format", async () => {
      await api
        .get(BASE_PATH)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test.only("should validate the unique identifier of any post be called id, not _id", async () => {
      const post = await helper.postsInDB();
      const keys = Object.keys(post[0]);
      assert(keys.includes("id"));
    });
  });

  describe("Create Posts", () => {
    test.only("should create a new post", async () => {
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

    test.only("should verify the backend responds 400 Bad Request if title or url props are missing", async () => {
      const newPostWithoutLikes = {
        author: "lucho",
        url: "url://",
      };

      await api
        .post(BASE_PATH)
        .send(newPostWithoutLikes)
        .expect(400)
        .then((res) => console.log(res.body));
    });
  });

  describe("Delete Posts", () => {
    test.only("should delete a Post", async () => {
      const actualPosts = await helper.postsInDB();
      const actual = actualPosts.length;
      const postToDelete = actualPosts[0];

      await api.delete(`${BASE_PATH}/${postToDelete.id}`).expect(204);
      const expectedPosts = await helper.postsInDB();
      const expected = expectedPosts.length;
      assert.strictEqual(actual - 1, expected);
    });

    test("should delete a Post and return 204 code status", async () => {
      const actualPosts = await helper.postsInDB();
      const id = actualPosts[0].id;
      await api.delete(`${BASE_PATH}/${id}`).expect(204);
    });
  });

  describe("Update Posts", async () => {
    test("should update author", async () => {
      const posts = await helper.postsInDB();
      const postUpdateAuthor = posts[0];
      const newAuthorName = "Feliciano";
      postUpdateAuthor.author = newAuthorName;

      const updatedPost = await api
        .put(`${BASE_PATH}/${postUpdateAuthor.id}`)
        .send(postUpdateAuthor)
        .expect(200);

      assert.strictEqual(updatedPost.body.author, newAuthorName);
    });

    test("should update likes", async () => {
      const posts = await helper.postsInDB();
      const postUpdateLikes = posts[1];
      postUpdateLikes.likes = postUpdateLikes.likes + 1;

      const updatedPost = await api
        .put(`${BASE_PATH}/${postUpdateLikes.id}`)
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
      await api.put(`${BASE_PATH}/${id}`).send(postUpdate).expect(404);
    });
  });
});
after(async () => await mongoose.connection.close());
