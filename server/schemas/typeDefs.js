const typeDefs =   `
    type Location {
        _id: ID!
        name: String!
        latitude: Int!
        longitude: Int!
        countryCode: String
    }

    type Query {
        location: [Location]
    }
`

module.exports = typeDefs;