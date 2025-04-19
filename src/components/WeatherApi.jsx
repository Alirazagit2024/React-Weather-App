import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import '../App.css'

const WeatherApi = () => {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("Karachi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "ca6dc54ad4074f00b0a204948242105";

  const getBgGradient = (condition) => {
    if (!condition) return "from-gray-300 to-gray-500";
    const text = condition.toLowerCase();
    if (text.includes("sunny")) return "from-yellow-400 to-orange-500";
    if (text.includes("cloudy")) return "from-gray-500 to-blue-600";
    if (text.includes("rain")) return "from-blue-600 to-indigo-700";
    if (text.includes("snow")) return "from-blue-200 to-gray-300";
    return "from-green-300 to-teal-500";
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
    setInputCity("");
  }, [city]);

  const bgGradient = getBgGradient(weather?.current?.condition?.text);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${bgGradient} transition-all duration-1000 p-4`}>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
          <i className="fas fa-cloud-sun mr-2"></i> Weather App
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setCity(inputCity);
            }}
            className="bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          />
          <button
            onClick={() => setCity(inputCity)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-300 text-lg mb-4">{error}</p>
            <button
              onClick={() => setCity(city)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <WeatherCard weather={weather} />
        )}
      </div>
    </div>
  );
};

export default WeatherApi;
