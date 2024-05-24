import React from "react";
import "./CurrentWeathers.css";

const CurrentWeathers = ({ data }) => {
    // console.log(data, "current");
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                </div>
            </div>
            <div
                className="icon"
                style={{
                    display: "grid",
                    justifyItems: "center",
                    alignItems: "center",
                }}>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={require(`../assets/icons/${data.weather[0].icon}.png`)}
                />
            </div>
            <div
                className="temp"
                style={{
                    display: "grid",
                    justifyItems: "center",
                    alignItems: "center",
                }}>
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <p className="weather-description">
                    {data.weather[0].description}
                </p>
            </div>
            <div className="bottom">
                <>
                    <div className="details">
                        <div
                            className="parameter-row"
                            style={{ paddingTop: "1rem" }}>
                            <span className="parameter-label">Feels like</span>
                            <span className="parameter-value">
                                {Math.round(data.main.feels_like)}°C
                            </span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Wind</span>
                            <span className="parameter-value">
                                {data.wind.speed} m/s
                            </span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Humidity</span>
                            <span className="parameter-value">
                                {data.main.humidity}%
                            </span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Pressure</span>
                            <span className="parameter-value">
                                {data.main.pressure} hPa
                            </span>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default CurrentWeathers;
