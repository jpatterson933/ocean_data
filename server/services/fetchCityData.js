require("dotenv").config();
const axios = require("axios");

async function fetchCity(cityName) {
    let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=";
    let apiKey = process.env.OPEN_WEATHER_API_KEY;

    let query = baseUrl + cityName + "&appid=" + apiKey;

    try {
        let response = await axios.get(query);

        console.log(response.data.city.coord.lat);

        if (response.status === 200) {
            const cityMeridian = {
                name: response.data.city.name,
                latitude: response.data.city.coord.lat,
                longitude: response.data.city.coord.lon,
                countryCode: response.data.city.country
            };

            // Create GraphQL query for mutation
            const mutation = `mutation ($name: String!, $latitude: Float!, $longitude: Float!, $countryCode: String) {
            createLocation(name: $name, latitude: $latitude, longitude: $longitude, countryCode: $countryCode) {
                    _id
                    name
                    latitude
                    longitude
                    countryCode
                }
            }`;

            // POST request to GraphQL API
            await axios.post('http://localhost:3001/graphql', {
                query: mutation,
                variables: cityMeridian,
            });
        } else {
            console.error("Please enter a valid city name")

        }
    } catch (error) {
        console.error(error)
    }
}

fetchCity("Malibu");