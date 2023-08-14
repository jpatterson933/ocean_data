const {Schema, model } = require("mongoose");
const weatherSchema = require("./Weather");

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    countryCode: {
        type: String,
    },
    timezone: {
        type: Number,
    },
    sunrise: {
        type: Number,
    },
    sunset: {
        type: Number,
    },
    weatherData: [weatherSchema]
});

const Location = model("Location", locationSchema);

module.exports = Location;