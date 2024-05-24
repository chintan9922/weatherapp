import React from "react";

function CardView({ data }) {
    let time = data.dt_txt.split(" ")[1].split(":");

    let hour = parseInt(time[0]);
    let amOrPm = hour >= 12 ? "PM" : "AM";

    if (hour > 12) {
        hour -= 12;
    } else if (hour === 0) {
        hour = 12;
    }

    return (
        <div
            style={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                backgroundColor: "#92C8EF",
                height: '25%',
                width: "100%",
                padding: '1% 1% 1% 1%',
                aspectRatio: "2/3",
                borderRadius: "10px",
            }}>
            <div
                className="date"
                style={{
                    width: "100%",
                    justifyItems: "center",
                    alignItems: "center",
                    display: "grid",
                }}>
                <label
                    className="day"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                    }}>
                    {data.dt_txt.split(" ")[0]}
                </label>
                <label
                    className="day"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#757575",
                    }}>
                    {hour}:{time[1]} {amOrPm}
                </label>
            </div>
            <div className="icon" style={{justifyContent:'center', display:'flex'}}>
                <img
                    src={require(`../assets/icons/${data.weather[0].icon}.png`)}
                    className="icon-small"
                    alt="weather"
                    style={{
                        height: "50%",
                        width: "50%",
                    }}
                />
            </div>
            <div
                className="temp"
                style={{ display: "flex", flexDirection: "row" }}>
                <label
                    className="description"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                    }}>
                    {data.weather[0].description}
                </label>
                <label
                    className="min-max"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        color: "#757575",
                        paddingLeft: "15px",
                    }}>
                    {Math.round(data.main.temp)}°C
                </label>
            </div>
        </div>
    );
}

export default CardView;
