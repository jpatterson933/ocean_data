const { Location, User } = require("../models");
const { getCityDataCreateNewLocationModel } = require("../services/fetchCityData");
const { signToken, verifyUser, getUserFromEmailToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate("locations")
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("locations")
            }
        },
        users: async (parent, args) => {
            return User.find({}).populate("locations");
        },
        locations: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            console.log(_id)
            return Location.find(params)
        },
        isUserVerified: async (parent, args, context) => {

            if (!context.user) {
                throw AuthenticationError;
            };

            try {
                const user = await User.findById(context.user._id)
                return user.isVerified;
            } catch (error) {
                console.error(error);
                throw new Error("Error retrieving verificaiton status");
            }

        }
    },
    Mutation: {
        addUser: async (parent, { email, password, isVerified }) => {
            const user = await User.create({ email, password, isVerified });
            const token = signToken(user);
            await verifyUser(user)
            // use the token returned in the headers of apollo sandbox for testing
            return { token, user };
        },
        verifyEmail: async (parent, { token, confirmationNumber }, context) => {
            try {

                if (!token) {
                    throw new Error("Authenticaiton token must be provided")
                }

                const userId = getUserFromEmailToken(token);
                if (!userId) {
                    throw new Error("Invalid or expired token!");
                }

                const user = await User.findById(userId);

                if (!user) {
                    throw new Error("User not found!!");
                }

                if (user.verificationNumber !== confirmationNumber) {
                    throw new Error("Verification number does not match!");
                }

                user.isVerified = true;
                await user.save();

                return user;
            } catch (error) {
                console.error(error);
            }
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw AuthenticationError;
        },
        deleteUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id })
            }
            throw AuthenticationError;
        },

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            };
            const correctPassword = await user.isCorrectPassword(password)

            if (!correctPassword) {
                throw AuthenticationError;
            };

            const token = signToken(user);

            return { token, user }

        },

        fetchCityData: async (parent, { cityName }, context) => {
            const userId = context.user._id;
            const cityData = await getCityDataCreateNewLocationModel(cityName, userId);

            return cityData;
        },
        createLocation: async (parent, args, context) => {
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