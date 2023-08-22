const typeDefs =   `
    type User {
        _id: ID
        email: String
        password: String
        isVerified: Boolean
        verificationNumber: Int
        locations: [Location]!
    }

    type WeatherMainData {
        temp: Float
        feels_like: Float
        temp_min: Float
        temp_max: Float
        pressure: Int
        sea_level: Int
        grnd_level: Int
        humidity: Int
        temp_kf: Float
    }

    type Weather {
        id: Int
        main: String
        description: String
        icon: String
    }

    type Clouds {
        all: Int
    }

    type Wind {
        speed: Float
        deg: Int
        gust: Float
    }

    type Sys {
        pod: String
    }

    type WeatherData {
        dt: Int
        main: WeatherMainData
        weather: [Weather]
        clouds: Clouds
        wind: Wind
        visibility: Int
        pop: Float
        sys: Sys
        dt_txt: String
    }


    input WeatherMainDataInput {
        temp: Float
        feels_like: Float
        temp_min: Float
        temp_max: Float
        pressure: Int
        sea_level: Int
        grnd_level: Int
        humidity: Int
        temp_kf: Float
    }

    input WeatherInput {
        id: Int
        main: String
        description: String
        icon: String
    }

    input CloudsInput {
        all: Int
    }

    input WindInput {
        speed: Float
        deg: Int
        gust: Float
    }

    input SysInput {
        pod: String
    }

    input WeatherDataInput {
        dt: Int
        main: WeatherMainDataInput
        weather: [WeatherInput]
        clouds: CloudsInput
        wind: WindInput
        visibility: Int
        pop: Float
        sys: SysInput
        dt_txt: String
    }


    type Location {
        _id: ID!
        name: String!
        latitude: Float!
        longitude: Float!
        countryCode: String
        timezone: Int
        sunrise: Int
        sunset: Int
        weatherData: [WeatherData]
    }

    type Auth {
        token: ID!
        user: User
    }







    
    type Query {
        user(email: String!): User
        me: User
        users: [User]
        isUserVerified: Boolean!

        locations(_id: String): [Location]
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        verifyEmail(token: String!, confirmationNumber: Int!): User

        updateUser(email: String!, password: String!): User
        deleteUser: User

        loginUser(email: String!, password: String!): Auth


        createLocation(name: String!, latitude: Float!, longitude: Float!, countryCode: String, timezone: Int, sunrise: Int, sunset: Int, weatherData: [WeatherDataInput], userId: ID! ): Location
        fetchCityData(cityName: String!): String
    }
`

module.exports = typeDefs;