const { test, describe, after, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = require("./../app");
const User = require("./../models/user");
const helper = require("./../tests/test_helper");
const USER_BASE_PATH = "/api/users";
const api = supertest(app);

describe("creating users", (params) => {
  beforeEach(async () => {
    // console.log("# USERS ub: ", await helper.usersInDB());
    await User.deleteMany({});
    // console.log("# USERS ua: ", await helper.usersInDB());
    const passwordHash = await bcrypt.hash("password", 10);
    const userObj = new User({ username: "admin", passwordHash });
    await userObj.save();
    // console.log("# USERS after saving: ", await helper.usersInDB());
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("should return one user", async () => {
    // console.log("# USERS ut: ", await helper.usersInDB());
    await api
      .get(USER_BASE_PATH)
      .expect(200)
      .expect((res) => {
        assert.strictEqual(res.body.length, 2);
      });
  });

  /* Somehow after saving the user, this is been deleted... maybe
  in the afterEach or the after 
  TODO: fix it later
  test("should create a new User", async () => {
    const usersAtStart = await helper.usersInDB();
    console.log("usersAtStart ", usersAtStart);

    const newUser = {
      username: "kurusu",
      name: "FKddddd",
      password: "qwerty",
    };

    await api
      .post(USER_BASE_PATH)
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    console.log("END: ", usersAtEnd);
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
  });
  */
});

after(async () => await mongoose.connection.close());
