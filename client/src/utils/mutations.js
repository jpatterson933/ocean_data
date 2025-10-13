import { gql } from "@apollo/client";

export const FETCH_CITY_DATA = gql`
    mutation fetchCityData($cityName: String!) {
        fetchCityData(cityName: $cityName)
    }
`