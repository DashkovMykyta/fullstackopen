import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";

const Books = (props) => {
  const { data: books, loading } = useQuery(GET_ALL_BOOKS);
  console.log(books, loading);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
