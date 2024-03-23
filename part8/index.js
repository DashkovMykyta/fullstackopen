const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", false);

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
  type Author {
    name: String!
    born: Int
    bookCount: Int
  }
  type Query {
    bookCount: Int
    authorCount: Int
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    addAuthor(name: String!, born: Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
 }
`;

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
        switch (args) {
          case args.author && args.genre:
            return await Book.find({
              author: args.author,
              genres: args.genre,
            }).populate("author");
          case args.author:
            return await Book.find({ author: args.author }).populate("author");
          case args.genre:
            return await Book.find({ genres: args.genre }).populate("author");
          default:
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
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new GraphQLError("not authenticated", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        const book = new Book({ ...args });
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
