const CounrtyCard = ({ country, weather }) => {
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} width="100" />
      </div>
      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>
            <strong>temperature:</strong> {weather.main.temp}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>wind:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </>
  );
};

export default CounrtyCard;
