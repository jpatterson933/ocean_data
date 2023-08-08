const typeDefs =   `
    type User {
        _id: ID
        email: String
        password: String
        isVerified: Boolean
        verificationNumber: Int
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
        verifyEmail(token: String!): User

        updateUser(email: String!, password: String!): User
        deleteUser: User

        loginUser(email: String!, password: String!): Auth


        createLocation(name: String!, latitude: Float!, longitude: Float!, countryCode: String): Location
        fetchCityData(cityName: String!): String
    }
`

module.exports = typeDefs;