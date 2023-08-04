const typeDefs =   `
    type User {
        _id: ID
        email: String
        password: String
        isVerified: Boolean
        locations: [Location]!
    }
    type Location {
        _id: ID!
        name: String!
        latitude: Float!
        longitude: Float!
        countryCode: String
    }

    type Query {
        locations(_id: String): [Location]
        user: User
    }

    type Mutation {
        createLocation(name: String!, latitude: Float!, longitude: Float!, countryCode: String): Location
        fetchCityData(cityName: String!): String
    }
`

module.exports = typeDefs;