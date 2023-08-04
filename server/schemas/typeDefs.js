const typeDefs =   `
    type Location {
        _id: ID!
        name: String!
        latitude: Float!
        longitude: Float!
        countryCode: String
    }

    type Query {
        locations(_id: String): [Location]
    }

    type Mutation {
        createLocation(name: String!, latitude: Float!, longitude: Float!, countryCode: String): Location
        fetchCityData(cityName: String!): String
    }
`

module.exports = typeDefs;