import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS, GET_GENRES } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const {
    data: books,
    loading,
    refetch,
  } = useQuery(GET_ALL_BOOKS, {
    variables: { genreToSearch: selectedGenre, authorToSearch: null },
  });
  const { data: genres, loading: genresLoading } = useQuery(GET_GENRES);
  useEffect(() => {
    selectedGenre &&
      refetch({ genreToSearch: selectedGenre, authorToSearch: null });
  }, [selectedGenre]);

  if (loading || genresLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      ) : null}
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
      <div>
        {genres.allGenres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
