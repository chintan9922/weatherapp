/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Search from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import { WEATHER_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import { Spin } from "antd";
import mapboxgl from "mapbox-gl";
import ForeCast from "./components/ForeCast";
import ForeCastCard from "./components/ForeCastCard";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CurrentWeathers from "./components/CurrentWeathers";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY291bnRlcjk5MjIiLCJhIjoiY2x3aHBmdjBvMGI3YTJqbnl4MnNoaXlnaCJ9.gvdQ-lkx6LTt7BXDKDzAqw";

function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [current, setCurrent] = useState([]);
    const [zoom, setZoom] = useState(9);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [marker, setMarker] = useState(null);
    const [todayWeather, setTodayWeather] = useState(null);
    const [weekForecast, setWeekForecast] = useState(null);

    useEffect(() => {
        if (lat !== null && lng !== null) {
            if (!map.current) {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/satellite-streets-v11",
                    center: [lng, lat],
                    zoom: zoom,
                    scrollZoom: false,
                    dragPan: false,
                    dragRotate: false,
                    keyboard: false,
                    doubleClickZoom: false,
                    touchZoomRotate: false,
                });

                map.current.on("move", () => {
                    setLng(map.current.getCenter().lng.toFixed(4));
                    setLat(map.current.getCenter().lat.toFixed(4));
                    setZoom(map.current.getZoom().toFixed(2));
                });
            }

            if (!marker) {
                setMarker(
                    new mapboxgl.Marker({
                        color: "#FF0000",
                    })
                        .setLngLat([lng, lat])
                        .addTo(map.current),
                );
            } else {
                marker.setLngLat([lng, lat]);
            }
        }
    }, [lat, lng, zoom, marker]);

    useEffect(() => {
        if (lat !== null && lng !== null) {
            fetchData();
            map.current.setCenter([lng, lat]);
        }
    }, [lat, lng]);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(parseFloat(position.coords.latitude));
                    setLng(parseFloat(position.coords.longitude));
                    setCurrent([
                        parseFloat(position.coords.latitude),
                        parseFloat(position.coords.longitude),
                    ]);
                },
                (error) => {
                    setStatus(
                        "Failed to retrieve your location. Please enable location services.",
                    );
                    setLat(parseFloat(0));
                    setLng(parseFloat(0));
                    setCurrent([parseFloat(0), parseFloat(0)]);
                    console.error(error);
                },
            );
        }
    };

    console.log(current, "ccccccc");

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
                    setTodayWeather([]);
                    setWeekForecast([]);
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
                    setTodayWeather([]);
                    setWeekForecast([]);
                });
        } else {
            setStatus("Latitude and longitude values are not available.");
        }

        setIsLoading(false);
    };

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        if (lat && lon) {
            setLat(parseFloat(lat));
            setLng(parseFloat(lon));
            map.current.setCenter([parseFloat(lon), parseFloat(lat)]);
        } else {
            setStatus("Please provide valid latitude and longitude.");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    const currentLocation = () => {
        if (navigator.geolocation) {
            return (
                Number(lat).toFixed(2) === Number(current[0]).toFixed(2) &&
                Number(lng).toFixed(2) === Number(current[1]).toFixed(2)
            );
        }
    };

    console.log(currentLocation());

    return (
        <div className="container">
            {isLoading ? (
                <div className="loader" style={{ paddingTop: "25%" }}>
                    <Spin tip="Getting Location...." size="large">
                        <div className="loader"></div>
                    </Spin>
                </div>
            ) : (
                <>
                    <div className="mainContainer">
                        <div
                            className="topView"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100vw",
                                padding: "1rem 0 0 0",
                            }}>
                            <div
                                className="searchBar"
                                style={{
                                    width: "40%",
                                    height: "10%",
                                    paddingLeft: "1rem",
                                    display: "flex",
                                    flexDirection: "row",
                                    // alignContent:'center',
                                    // justifyContent:'center',
                                    alignItems: "center",
                                    // justifyItems:'center',
                                }}>
                                <div
                                    className="iconlocation"
                                    onClick={() => getLocation()}
                                    style={{
                                        border: "1px solid #558fb7",
                                        padding: "5px",
                                        width: "3rem",
                                        display: currentLocation()
                                            ? "none"
                                            : "grid",
                                        alignItems: "center",
                                        justifyItems: "center",
                                        backgroundColor: "#558fb7",
                                        borderRadius: "10%",
                                    }}>
                                    <MyLocationIcon
                                        style={{ color: "white" }}
                                    />
                                </div>
                                <div
                                    className="search"
                                    style={{
                                        width: "75%",
                                        marginLeft: "10px",
                                    }}>
                                    <Search
                                        onSearchChange={handleOnSearchChange}
                                    />
                                </div>
                            </div>

                            <div
                                className="CurrentWeather"
                                style={{
                                    // display: "grid",
                                    // justifyItems: "center",
                                    // alignItems: "center",
                                    paddingRight: "6%",
                                }}>
                                {isLoading ? (
                                    <Spin tip="Loading" size="large">
                                        <div className="loader"></div>
                                    </Spin>
                                ) : (
                                    <>
                                        {todayWeather !== null && (
                                            <CurrentWeathers
                                                data={todayWeather}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className="bottomView"
                            style={{ overflowX: "auto" }}>
                            {isLoading ? (
                                <Spin tip="Loading" size="large">
                                    <div className="loader"></div>
                                </Spin>
                            ) : (
                                <>
                                    {weekForecast !== null && (
                                        <ForeCastCard data={weekForecast} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default App;
