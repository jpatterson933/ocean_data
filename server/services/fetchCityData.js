require("dotenv").config();
const axios = require("axios");

function createQuery(city) {
    let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=";
    let apiKey = process.env.OPEN_WEATHER_API_KEY;
    let query = `${baseUrl}${city}&appid=${apiKey}`;
    return query;
};

function mutationQueryForLocationModel() {
    const graphQLMutation = `mutation ($name: String!, $latitude: Float!, $longitude: Float!, $countryCode: String, $timezone: Int, $sunrise: Int, $sunset: Int, $weatherData: [WeatherDataInput]) {
    createLocation(name: $name, latitude: $latitude, longitude: $longitude, countryCode: $countryCode, timezone: $timezone, sunrise: $sunrise, sunset: $sunset, weatherData: $weatherData) {
            _id
            name
            latitude
            longitude
            countryCode
            timezone
            sunrise
            sunset
            weatherData {
                dt
                main {
                    temp
                    feels_like
                    temp_min
                    temp_max
                    pressure
                    sea_level
                    grnd_level
                    humidity
                    temp_kf
                }
                weather {
                    id
                    main
                    description
                    icon
                }
                clouds {
                    all
                }
                wind {
                    speed
                    deg
                    gust
                }
                visibility
                pop
                sys {
                    pod
                }
                dt_txt
            }
        }
    }`;
    return graphQLMutation;
};

async function responseDataForLocationModel(data) {
    const cityMeridian = {
        name: data.city.name,
        latitude: data.city.coord.lat,
        longitude: data.city.coord.lon,
        countryCode: data.city.country,
        timezone: data.city.timezone,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset
    };
    return cityMeridian;
};

async function responseDataForForecastModel(data){
    return data.list.map(entry => ({
        dt: entry.dt,
        main: entry.main,
        weather: entry.weather,
        clouds: entry.clouds,
        wind: entry.wind,
        visibility: entry.visibility,
        pop: entry.pop,
        sys: entry.sys,
        dt_txt: entry.dt_txt,

    }))
}

async function createNewLocationModel(mutationQuery, mutationVariables){
    await axios.post('http://localhost:3001/graphql', {
        query: mutationQuery,
        variables: mutationVariables,
    });
};

async function getCityDataCreateNewLocationModel(cityName) {
    let query = createQuery(cityName)
    try {
        let {status, data} = await axios.get(query);
        if (status === 200) {
            const mutationData = await responseDataForLocationModel(data);
            const mutationForecastData = await responseDataForForecastModel(data);
            
            const mutationQuery = mutationQueryForLocationModel();
            await createNewLocationModel(mutationQuery, {
                ...mutationData,
                weatherData: mutationForecastData
            
            });
        } else {
            console.error("Please enter a valid city name");
        };
    } catch (error) {
        // console.error(error.response)
        console.error(error.response.data);
    };
};

module.exports = {getCityDataCreateNewLocationModel};