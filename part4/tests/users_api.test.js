const { test, after, beforeEach, describe } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const assert = require("assert");
const User = require("../models/user");
const mongoose = require("mongoose");

const initialUsers = [
  {
    username: "root",
    name: "Superuser",
    password: "password",
  },
  {
    username: "user",
    name: "User",
    password: "password",
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  const users = initialUsers.map((user) => new User(user));
  await Promise.all(users.map((user) => user.save()));
});

describe("users", () => {
  test("user creation", async () => {
    const user = {
      username: "test",
      name: "Test",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await api.get("/api/users");

    const contents = users.body.find((u) => u.username === "test");
    assert.strictEqual(contents.username, "test");
  });
  test("invalid user creation", async () => {
    const user = {
      username: "te",
      name: "Test",
      password: "pa",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await api.get("/api/users");
    assert.strictEqual(users.body.length, 2);
  });
  test("unique username", async () => {
    const user = {
      username: "root",
      name: "Test",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await api.get("/api/users");
    assert.strictEqual(users.body.length, 2);
  });
});

after(async () => {
  await mongoose.connection.close();
});
