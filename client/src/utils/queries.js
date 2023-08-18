import { gql } from "@apollo/client";
export const IS_USER_VERIFIED = gql`
    query IsUserVerified {
        isUserVerified
    }
`

export const QUERY_ME = gql`
    query Me {
        me {
        _id
        email
        isVerified
        locations {
            _id
            name
            latitude
            longitude
            countryCode
            timezone
            sunrise
            sunset
        }
        }
    }
`