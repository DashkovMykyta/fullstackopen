import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS, GET_ME } from "../queries";

export default function Recomended() {
  const { data, loading } = useQuery(GET_ME);
  const {
    data: books,
    refetch,
    loading: bLoading,
  } = useQuery(GET_ALL_BOOKS, {
    variables: { genreToSearch: data?.me.favoriteGenre },
  });

  useEffect(() => {
    if (data?.me.favoriteGenre) {
      refetch({ genreToSearch: data.me.favoriteGenre });
    }
  }, [data]);

  if (loading || bLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>recomended</h2>
      <p>
        books in your favorite genre <strong>{data.me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
