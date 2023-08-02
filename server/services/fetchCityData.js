require("dotenv").config();
const axios = require("axios");

async function fetchCity(cityName){
    let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=";
    let apiKey = process.env.OPEN_WEATHER_API_KEY;

    let query = baseUrl + cityName +"&appid=" + apiKey;

    try{
        let response = await axios.get(query);

        console.log(response);
    } catch (error) {
        console.error(error)
    }
}

fetchCity("Malibu");