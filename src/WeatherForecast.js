import React, { useState, useEffect } from "react";
import "./weather.css"
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay"
import { RotatingLines } from "react-loader-spinner";

export default function WeatherForecast(props) {
    const [ready, setReady] = useState(false)
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        setReady(false);
    }, [props.data.lat]);
    
    function displayForecast(response) {
        setForecast(response.data.daily);
        setReady(true);
    }

    function load() {
        let long = props.data.lon;
        let lat = props.data.lat;
        let apiKey = "9ed24e5c436afdb265857268e29a26c9";
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
        axios.get(url).then(displayForecast)
    }

    if (ready) {
        return(
            <div>
                <div className="row d-none d-sm-flex">
                    {forecast.map(function(dailyForecast, index) {
                        if (index < 5) {
                            return (
                                <div className="col" key={index}>
                                    <WeatherForecastDay data={dailyForecast} />
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="row d-flex d-sm-none">
                    {forecast.map(function(dailyForecast, index) {
                        if (index < 3) {
                            return (
                                <div className="col" key={index}>
                                    <WeatherForecastDay data={dailyForecast} />
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="row d-flex d-sm-none mt-3">
                    {forecast.map(function(dailyForecast, index) {
                        if (index > 2 && index < 6) {
                            return (
                                <div className="col" key={index}>
                                    <WeatherForecastDay data={dailyForecast} />
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        )
    } else {
        load();
        return (
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="48"
            visible={true}
            />
        )
    }
}