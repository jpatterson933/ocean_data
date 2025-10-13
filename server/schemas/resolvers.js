const { Location, User } = require("../models");
const { getCityDataCreateNewLocationModel } = require("../services/fetchCityData");

const resolvers = {
    Query: {
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate("locations")
        },
        users: async (parent, args) => {
            return User.find({}).populate("locations");
        },
        locations: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            console.log(_id)
            return Location.find(params)
        }
    },
    Mutation: {
        fetchCityData: async (parent, { cityName }) => {
            try {
                console.log('Fetching city data for:', cityName);
                const cityData = await getCityDataCreateNewLocationModel(cityName);
                console.log('City data received:', cityData);
                return JSON.stringify(cityData);
            } catch (error) {
                console.error('Error in fetchCityData resolver:', error);
                throw error;
            }
        },
        createLocation: async (parent, args) => {
            const location = await Location.create(args);
            const userId = args.userId;
            if (userId) {
                await User.findByIdAndUpdate(userId, {
                    $push: {
                        locations: {
                            $each: [location._id],
                            $slice: -1
                        }
                    }
                })
            }
            return location;
        }
    }
};

module.exports = resolvers;