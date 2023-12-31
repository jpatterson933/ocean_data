import { gql } from "@apollo/client";

export const ADD_USER = gql`
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

export const VERIFY_USER = gql`
    mutation verifyUser($token: String!, $confirmationNumber: Int!) {
        verifyEmail(token: $token, confirmationNumber: $confirmationNumber) {
            _id
            email
            isVerified
        }

    }
`

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
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