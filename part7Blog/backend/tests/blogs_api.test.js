const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");

const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "First blog",
    author: "First author",
    url: "www.firsturl.com",
    likes: 1,
  },
  {
    title: "Second blog",
    author: "Second author",
    url: "www.secondurl.com",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

describe("adding and retrieving blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, initialBlogs.length);
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Third blog",
      author: "Third author",
      url: "www.thirdurl.com",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");

    const contents = res.body.map((r) => r.title);
    assert(contents.includes("Third blog"));
  });

  test("a blog can't be added without right token", async () => {
    const newBlog = {
      title: "Third blog",
      author: "Third author",
      url: "www.thirdurl.com",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, initialBlogs.length);
  });

  test("blog without likes sets to 0", async () => {
    const newBlog = {
      title: "Third blog",
      author: "Third author",
      url: "www.thirdurl.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
      .send(newBlog)
      .expect(201);

    const res = await api.get("/api/blogs");
    const addedBlog = res.body.find((r) => r.title === "Third blog");
    assert.strictEqual(addedBlog.likes, 0);
  });

  test("blog without title and url is not added", async () => {
    const newBlog = {
      author: "Third author",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
      .send(newBlog)
      .expect(400);

    const res = await api.get("/api/blogs");
    assert.strictEqual(res.body.length, initialBlogs.length);
  });
});

describe("deleting blogs", () => {
  test("a blog can be deleted", async () => {
    const before = await api.get("/api/blogs");

    await api
      .delete(`/api/blogs/${before.body[0].id}`)
      .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
      .expect(204);

    const after = await api.get("/api/blogs");
    assert.strictEqual(after.body.length, before.body.length - 1);
  });
  test("a blog can't be deleted without right token", async () => {
    const before = await api.get("/api/blogs");

    await api.delete(`/api/blogs/${before.body[0].id}`).expect(401);

    const after = await api.get("/api/blogs");
    assert.strictEqual(after.body.length, before.body.length);
  });
});

describe("updating blogs", () => {
  test("a blog can be updated", async () => {
    const res = await api.get("/api/blogs");

    const updatedBlog = { ...res.body[0], likes: 100 };

    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200);

    const after = await api.get("/api/blogs");
    const updated = after.body.find((r) => r.id === updatedBlog.id);
    assert.strictEqual(updated.likes, 100);
  });
});

after(async () => {
  await mongoose.connection.close();
});
