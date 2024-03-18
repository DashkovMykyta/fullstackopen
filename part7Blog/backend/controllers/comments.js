const commentRouter = require("express").Router();
const Comment = require("../models/comments");
const Blog = require("../models/blog");

commentRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const comment = new Comment({ content: body.content, blog: body.blogId });
    const res = await comment.save();

    const blog = await Blog.findById(body.blogId);
    blog.comments = blog.comments.concat(res.id);
    await blog.save();

    response.status(201).json(res);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "invalid request" });
  }
});
module.exports = commentRouter;
