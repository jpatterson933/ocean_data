const { Location, User } = require("../models");
const { getCityDataCreateNewLocationModel } = require("../services/fetchCityData");
const { signToken, verifyUser, AuthenticationError } = require('../utils/auth');

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
            // await verifyUser(user)
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

        loginUser: async(parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw AuthenticationError;
            };
            const correctPassword = await user.isCorrectPassword(password)

            if(!correctPassword){
                throw AuthenticationError;
            };

            const token = signToken(user);

            return { token, user}

        },




        fetchCityData: async (parent, { cityName }) => {
            console.log(cityName, "testing")
            const cityData = await getCityDataCreateNewLocationModel(cityName);
            return cityData;
        },
        createLocation: async (parent, args) => {
            const location = await Location.create(args);
            return location;
        }
    }
};

module.exports = resolvers;