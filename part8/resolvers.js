const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () =>
      Author.find({}).then((authors) =>
        authors.map(async (author) => {
          const bookCount = await Book.find({
            author: author._id,
          }).countDocuments();

          author["bookCount"] = bookCount;
          return author;
        })
      ),
    allBooks: async (root, args) => {
      try {
        if (args.author && args.genre) {
          return await Book.find({
            author: args.author,
            genres: args.genre,
          }).populate("author");
        } else if (args.author) {
          return await Book.find({ author: args.author }).populate("author");
        } else if (args.genre) {
          return await Book.find({ genres: args.genre }).populate("author");
        } else {
          return await Book.find({}).populate("author");
        }
      } catch (error) {
        throw new GraphQLError("Fetching books failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const genres = await Book.find({}).distinct("genres");
      return genres;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      try {
        console.log("currentUser", currentUser);
        if (!currentUser) {
          throw new GraphQLError("not authenticated", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        const author = await Author.findOne({ name: args.author });
        const book = new Book({ ...args, author });

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book.save();
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new GraphQLError("not authenticated", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          return null;
        }
        const updatedAuthor = Author.findByIdAndUpdate(
          author._id,
          { born: args.setBornTo },
          { new: true }
        );

        return updatedAuthor.save();
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    addAuthor: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new GraphQLError("not authenticated", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        const author = new Author({ ...args });
        return author.save();
      } catch (error) {
        throw new GraphQLError("Adding author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args, password: "showme" });
      return user.save();
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (user && args.password === "showme") {
        const userForToken = {
          username: user.username,
          id: user._id,
        };

        return { value: jwt.sign(userForToken, process.env.SECRET) };
      } else {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
