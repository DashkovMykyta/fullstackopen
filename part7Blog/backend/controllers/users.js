const usersRouter = require("express").Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs");
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { password, username, name } = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    password: passwordHash,
    username: username,
    name: name,
  });

  const res = await user.save();
  response.status(201).json(res);
});

module.exports = usersRouter;
