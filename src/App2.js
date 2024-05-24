/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Search from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
// import Forecast from "./components/ForeCast";
import { WEATHER_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import { Spin } from "antd";
import ForeCastCard from "./components/ForeCastCard";

function App() {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [todayWeather, setTodayWeather] = useState(null);
    const [weekForecast, setWeekForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (lat && lng) {
            fetchData();
        }
    }, [lat, lng]);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                },
                (error) => {
                    setStatus(
                        "Failed to retrieve your location. Please enable location services.",
                    );
                    console.error(error);
                },
            );
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        if (lat !== null && lng !== null) {
            fetch(
                `${WEATHER_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`,
            )
                .then((response) => response.json())
                .then((data) => {
                    setTodayWeather({ city: data.name, ...data });
                })
                .catch((error) => {
                    console.log(error);
                });

            fetch(
                `${WEATHER_URL}/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`,
            )
                .then((response) => response.json())
                .then((data) => {
                    setWeekForecast({ city: data.name, ...data });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setStatus("Latitude and longitude values are not available.");
        }

        setIsLoading(false);
    };

    const handleOnSearchChange = (searchData) => {
        // console.log(searchData, "searchdata");
        const [lat, lon] = searchData.value.split(" ");

        if (lat && lon) {
            setLat(lat);
            setLng(lon);
            fetchData();
        } else {
            setStatus("Please provide valid latitude and longitude.");
        }
    };

    // console.log(isLoading, "isLoading");

    return (
        <div className="container">
            <div className="mainContainer">
                <Search onSearchChange={handleOnSearchChange} />
                {isLoading ? (
                    <Spin
                        tip="Loading"
                        size="large"
                        style={{
                            display: "grid",
                            justifyItems: "center",
                            alignItems: "center",
                            paddingTop: "10%",
                        }}></Spin>
                ) : (
                    <>
                        {todayWeather && <CurrentWeather data={todayWeather} />}
                        {weekForecast && <ForeCastCard data={weekForecast} />}
                        {/* {weekForecast && <Forecast data={weekForecast} />} */}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
