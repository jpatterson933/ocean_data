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

export const QUERY_LOCATION = gql`
    query Location($_id: String) {

        locations(_id: $_id) {
            _id
            countryCode
            latitude
            longitude
            name
            sunrise
            sunset
            timezone
            weatherData {
                dt
                main {
                    temp
                    feels_like
                    temp_min
                    temp_max
                    pressure
                    sea_level
                    grnd_level
                    humidity
                    temp_kf
                }
                weather {
                    id
                    main
                    description
                    icon
                }
                clouds {
                    all 
                }
                wind {
                    speed
                    deg
                    gust
                }
                visibility
                pop
                sys {
                    pod
                }
                dt_txt
            }
        }
    }
`