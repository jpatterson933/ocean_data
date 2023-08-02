require("dotenv").config();
const axios = require("axios");

function createQuery(city) {
    let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=";
    let apiKey = process.env.OPEN_WEATHER_API_KEY;
    let query = `${baseUrl}${city}&appid=${apiKey}`;
    return query;
};

function createLocationMutationQuery() {
    const graphQLMutation = `mutation ($name: String!, $latitude: Float!, $longitude: Float!, $countryCode: String) {
    createLocation(name: $name, latitude: $latitude, longitude: $longitude, countryCode: $countryCode) {
            _id
            name
            latitude
            longitude
            countryCode
        }
    }`;
    return graphQLMutation;
};

async function responseDataForLocationModel(data) {
    const cityMeridian = {
        name: data.city.name,
        latitude: data.city.coord.lat,
        longitude: data.city.coord.lon,
        countryCode: data.city.country
    };
    return cityMeridian;
};

async function postNewLocationModel(mutationQuery, mutationVariables){
    await axios.post('http://localhost:3001/graphql', {
        query: mutationQuery,
        variables: mutationVariables,
    });
};

async function getCityDataPostNewLocationModel(cityName) {
    let query = createQuery(cityName)
    try {
        let {status, data} = await axios.get(query);
        if (status === 200) {
            const mutationData = await responseDataForLocationModel(data);
            const mutation = createLocationMutationQuery();
            await postNewLocationModel(mutation, mutationData);
        } else {
            console.error("Please enter a valid city name");
        };
    } catch (error) {
        console.error(error);
    };
};

getCityDataPostNewLocationModel("Newport Beach");