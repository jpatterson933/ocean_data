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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(email: String!): User
        me: User
        users: [User]
        locations(_id: String): [Location]
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        updateUser(email: String!, password: String!): User
        deleteUser: User
        createLocation(name: String!, latitude: Float!, longitude: Float!, countryCode: String): Location
        fetchCityData(cityName: String!): String
    }
`

module.exports = typeDefs;