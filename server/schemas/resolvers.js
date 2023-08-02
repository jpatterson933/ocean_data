const { Location } = require("../models");

const resolvers = {
    Query: {
        locations: async (parent, { _id} ) => {
            const params = _id ? { _id } : {};
            return Location.find(params)
        }
    },
    Mutation: {
        createLocation: async(parent, args) => {
            const location = await Location.create(args);
            return location;
        }
    }
};

module.exports = resolvers;