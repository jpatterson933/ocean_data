import { gql } from "@apollo/client";

const ADD_USER = gql`
    mutation addUser(
        $email: String!
        $password: String!
    ) {
        addUser(
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`

export const FETCH_CITY_DATA = gql`
    mutation fetchCityData($cityName: String!) {
        fetchCityData(cityName: $cityName)
    }
`