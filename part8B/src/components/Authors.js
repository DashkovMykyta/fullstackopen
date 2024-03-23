import { useQuery, useMutation } from "@apollo/client";
import { CHANGE_YEAR, GET_ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const { data: authors, loading } = useQuery(GET_ALL_AUTHORS);

  const [changeYear] = useMutation(CHANGE_YEAR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
  });

  const handleSubmitChange = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const born = event.target[1].value;
    changeYear({ variables: { name, born: Number(born) } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmitChange}>
          <select>
            {authors.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <input type="number" />
          <button>update author</button>
        </form>
      </div>
    </>
  );
};

export default Authors;
