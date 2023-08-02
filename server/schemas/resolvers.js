const { Location } = require("../models");

const resolvers = {
    Query: {
        location: async () => {
            return Location.find({})
        }
    }
};

module.exports = resolvers;