const {Schema, model } = reqauire("mongoose");

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
});

const Location = model("Location", locationSchema);

module.exports = Location;