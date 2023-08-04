const { Location, User } = require("../models");
const { getCityDataPostNewLocationModel } = require("../services/fetchCityData");
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate("locations")
        },
        me: async(parent, args, context) => {
            if(context.user) {
                return User.findOne({_id: context.user._id}).populate("locations")
            }
        },
        users: async(parent, args) => {
            return User.find({}).populate("locations");
        },
        locations: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Location.find(params)
        }
    },
    Mutation: {
        addUser: async (parent, {email, password}) => {
            const user = await User.create({email, password});
            const token = signToken(user);
            // use the token returned in the headers of apollo sandbox for testing
            return {token, user};
        },

        updateUser: async(parent, args, context) => {
            if(context.user) {
                return User.findByIdAndUpdate(context.user._id, args, {new: true});
            }

            throw AuthenticationError;
        },
        deleteUser: async(parent, args, context) => {
            if(context.user) {
                return User.findOneAndDelete({ _id: context.user._id })
            }
            throw AuthenticationError;
        },




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