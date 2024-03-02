const ListItem = ({ country, setCountry }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <p>{country.name.common}</p>
      <button onClick={() => setCountry(country.name.common)}>Show</button>
    </div>
  );
};

export default ListItem;
