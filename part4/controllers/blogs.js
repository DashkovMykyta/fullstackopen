const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const userReq = request.user;

  if (!userReq) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(userReq.id);
  const blog = new Blog({ ...request.body, user: user.id });
  const res = await blog.save();

  user.blogs = user.blogs.concat(res.id);
  await user.save();

  response.status(201).json(res);
});

blogsRouter.delete("/:id", async (request, response) => {
  const userReq = request.user;
  if (!userReq) {
    return response.status(401).json({ error: "token invalid" });
  }
  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(userReq.id);

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "unauthorized" });
  }
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.status(200).end();
});

module.exports = blogsRouter;
