import React, {useState} from "react";
import "./weather.css"
import axios from "axios";
import Date from "./Date";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
    const [weather, setWeather] = useState({ready: false})
    const [city, setCity] = useState(props.defaultCity)

    function search() {
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ed24e5c436afdb265857268e29a26c9&units=imperial`
        axios.get(apiUrl).then(handleResponse);
    }

    function handleResponse(response) {
        setWeather({
            ready: true,
            date: response.data.dt,
            city: response.data.name,
            icon: response.data.weather[0].icon,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            lat: response.data.coord.lat,
            lon: response.data.coord.lon
          });
    }

    function handleChange(event) {
        event.preventDefault();
        setCity(event.target.value);
    }

    function handleClick(event) {
        event.preventDefault();
        search();
    }
    
    if (weather.ready) {
        return (
            <div className="Weather card">
                <div className="card-body">
                    <form className="search mb-3">
                        <input type="search" onChange={handleChange} placeholder="Enter a location" className="search-bar"></input>
                        <input type="submit" onClick={handleClick} value="Search" className="btn btn-secondary shadow-sm search-button"/>
                    </form>
                    <h1>{weather.city}</h1>
                    <Date response={weather} className="mb-4"/>
                    <div className="weather-info d-flex">
                        <img src={`images/${weather.icon}.svg`} alt={weather.description} className="icon" />
                        <h2 className="temp">{Math.round(weather.temperature)}°</h2>
                        <ul className="big-screen d-none d-sm-block">
                            <li className="text-capitalize">{weather.description}</li>
                            <li>Humidity: {weather.humidity}%</li>
                            <li>Wind Speed: {weather.wind} mph</li>
                        </ul>
                    </div>
                    <ul className="small-screen d-block d-sm-none">
                        <li className="text-capitalize">{weather.description}</li>
                        <li>Humidity: {weather.humidity}%</li>
                        <li>Wind Speed: {weather.wind} mph</li>
                    </ul>
                    <hr />
                    <WeatherForecast data={weather} className="mb-4"/>
                </div>
            </div>
        )
    } else {
        search();
        return (
            <div className="Weather card">
                <div className="card-body">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }
    
}