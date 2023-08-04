const { Location, User } = require("../models");
const { getCityDataPostNewLocationModel } = require("../services/fetchCityData");

const resolvers = {
    Query: {
        user: async () => {
            return User.find().populate("locations")
        },
        locations: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Location.find(params)
        }
    },
    Mutation: {
        fetchCityData: async (parent, { cityName }) => {
            console.log(cityName, "testing")
            const cityData = await getCityDataPostNewLocationModel(cityName);
            return cityData;
        },
        createLocation: async (parent, args) => {
            const location = await Location.create(args);
            return location;
        }
    }
};

module.exports = resolvers;