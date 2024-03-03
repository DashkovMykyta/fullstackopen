const express = require("express");
var morgan = require("morgan");
require("dotenv").config();

const cors = require("cors");
const Person = require("./models/persons");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] :body - :response-time ms")
);

/////////////////////////// ROUTES ///////////////////////////
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  try {
    Person.find({}).then((persons) => {
      response.json(persons);
    });
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const person = await Person.findById(id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  try {
    const { name, number } = request.body;
    const id = request.params.id;
    const person = await Person.findByIdAndUpdate(
      id,
      { name, number },
      { new: true, runValidators: true, context: "query" }
    );
    response.status(200).json(person);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    await Person.findByIdAndDelete(id);

    response.status(204).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: "content missing",
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    const res = await person.save();
    response.json(res);
  } catch (error) {
    next(error);
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
