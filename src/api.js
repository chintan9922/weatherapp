export const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "17f9774202mshcc58cccb4c7c733p16fd3djsnfa2f49ec0af1",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
};

export const WEATHER_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "caafa4ff537995fd956032ae1fc60dc2";

// export async function fetchWeatherData(lat, lon) {
// 	try {
// 	  let [weatherPromise, forcastPromise] = await Promise.all([
// 		fetch(
// 		  `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
// 		),
// 		fetch(
// 		  `${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
// 		),
// 	  ]);

// 	  const weatherResponse = await weatherPromise.json();
// 	  const forcastResponse = await forcastPromise.json();
// 	  return [weatherResponse, forcastResponse];
// 	} catch (error) {
// 	  console.log(error);
// 	}
//   }

//   export async function fetchCities(input) {
// 	try {
// 	  const response = await fetch(
// 		`${url}/cities?minPopulation=10000&namePrefix=${input}`,
// 		options
// 	  );

// 	  const data = await response.json();
// 	  return data;
// 	} catch (error) {
// 	  console.log(error);
// 	  return;
// 	}
//   }
