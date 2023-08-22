const { Schema } = require("mongoose");


const weatherSchema = new Schema({
    dt: Number,
    main: {
        temp: Number,
        feels_like: Number,
        temp_min: Number,
        temp_max: Number,
        pressure: Number,
        sea_level: Number,
        grnd_level: Number,
        humidity: Number,
        temp_kf: Number,
    },
    weather: [{
        id: Number,
        main: String,
        description: String,
        icon: String,
    }],
    clouds: {
        all: Number,
    },
    wind: {
        speed: Number,
        deg: Number,
        gust: Number,
    },
    visibility: Number,
    pop: Number,
    sys: {
        pod: String,
    },
    dt_txt: String,
});

module.exports = weatherSchema;