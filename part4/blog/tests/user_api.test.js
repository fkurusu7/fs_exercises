const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = require("./../app");
const User = require("./../models/user");
const helper = require("./../tests/test_helper");
const USER_BASE_PATH = "/api/users";
const api = supertest(app);

describe("", (params) => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    await api.post();
  });

  test("should return one user", async () => {
    await api
      .get(USER_BASE_PATH)
      .expect(200)
      .expect((res) => {
        assert.strictEqual(res.body.length, 1);
      });
  });

  test("should create a new User", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "kurusu",
      name: "FK",
      password: "qwerty",
    };

    await api
      .post(USER_BASE_PATH)
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    const usernames = usersAtEnd.map((u) => u.username);
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => await mongoose.connection.close());
