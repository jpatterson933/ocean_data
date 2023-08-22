import { useQuery } from "@apollo/client";

import { useParams } from 'react-router-dom';

import { QUERY_LOCATION } from "../utils/queries";
function Location() {

    const { locationId } = useParams();

    if (locationId) {

        const { data, loading, error } = useQuery(QUERY_LOCATION, {
            variables: { _id: locationId }
        })
        if (error) {
            console.error("Error fetching data:", error);
            console.error("Error details:", error.networkError?.result?.errors);
        }
        if (!loading && data && data.locations) {
            console.log(data.locations)
    
        }
    }



    return (
        <>
            <h1>Location form</h1>
            <h2>{locationId}</h2>
        </>
    )
}

export default Location;