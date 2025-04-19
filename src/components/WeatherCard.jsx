const WeatherCard = ({ weather }) => {
  if (!weather || !weather.current) return null;

  return (
    <div className="text-white">
      <div className="flex sm:flex-row justify-between items-center mb-4">
        <img
          src={weather.current.condition.icon}
          alt="Weather icon"
          className="w-24 h-24 sm:w-32 sm:h-32"
        />
        <div className="text-right">
          <p className="text-5xl font-extrabold">
            {Math.round(weather.current.temp_c)}
            <sup className="text-3xl">°C</sup>
          </p>
          <p className="text-xl capitalize">{weather.current.condition.text}</p>
        </div>
      </div>
      <h4 className="text-3xl font-semibold text-center mb-4">
        {weather.location.name.toUpperCase()}, {weather.location.country.toUpperCase()}
      </h4>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-left gap-3">
          <i className="fas fa-tint text-2xl"></i>
          <div>
            <p className="font-bold text-lg">{weather.current.humidity}%</p>
            <p className="text-sm">Humidity</p>
          </div>
        </div>
        <div className="flex items-center text-right gap-3">
          <i className="fas fa-wind text-2xl"></i>
          <div>
            <p className="font-bold text-lg">{weather.current.wind_kph} Kph</p>
            <p className="text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center text-left gap-3 ">
          <i className="fas fa-thermometer-half text-2xl"></i>
          <div>
            <p className="font-bold text-lg">{Math.round(weather.current.feelslike_c)}°C</p>
            <p className="text-sm">Feels Like</p>
          </div>
        </div>
        <div className="flex text-right items-center gap-3 ">
          <i className="fas fa-cloud text-2xl"></i>
          <div>
            <p className="font-bold text-lg">{weather.current.cloud}%</p>
            <p className="text-sm">Clouds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
