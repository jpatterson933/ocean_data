import { gql } from "@apollo/client";
export const IS_USER_VERIFIED = gql`
    query IsUserVerified {
        isUserVerified
    }
`