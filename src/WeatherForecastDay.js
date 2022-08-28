import React from "react";

export default function WeatherForecast(props) {
    function formatMaxTemp() {
        let temp = Math.round(props.data.temp.max);
        return `${temp}°`
    }

    function formatMinTemp() {
        let temp = Math.round(props.data.temp.min);
        return `${temp}°`
    }

    function day() {
        let date = new Date(props.data.dt * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        return days[day];
    }
    
    return (
        <div>
            <div className="forecast-day">{day()}</div>
            <img src={`images/${props.data.weather[0].icon}.svg`} alt={props.data.weather[0].description} className="forecast-weather-icon"/>
            <div className="forecast-temp">
                <span>{formatMaxTemp()} /</span>
                <span className="min-temp"> {formatMinTemp()}</span>
            </div>
        </div>
    )
}