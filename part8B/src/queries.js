import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query allBooks($authorToSearch: String, $genreToSearch: String) {
    allBooks(author: $authorToSearch, genre: $genreToSearch) {
      title
      author {
        name
        born
        bookCount
      }
      genres
      published
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      bookCount
    }
    genres
    published
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CHANGE_YEAR = gql`
  mutation changeYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_GENRES = gql`
  query {
    allGenres
  }
`;

export const GET_ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
