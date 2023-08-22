import { useQuery } from "@apollo/client";

import { useParams } from 'react-router-dom';

import { QUERY_LOCATION } from "../utils/queries";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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




            return (
                <>
                    {data.locations.map(location => {
                        const { name, countryCode, latitude, longitude, timezone, sunrise, sunset } = location;
                        return (
                            <>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Title>{name}</Card.Title>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item action variant="info">Country Code</ListGroup.Item>
                                        <ListGroup.Item action>{countryCode}</ListGroup.Item>
                                        <ListGroup.Item action variant="info">Latitude</ListGroup.Item>
                                        <ListGroup.Item action>{latitude}</ListGroup.Item>
                                        <ListGroup.Item action variant="info">Longitude</ListGroup.Item>
                                        <ListGroup.Item action>{longitude}</ListGroup.Item>
                                        <ListGroup.Item action variant="info">Timezone</ListGroup.Item>
                                        <ListGroup.Item action>{timezone}</ListGroup.Item>
                                        <ListGroup.Item action variant="info">Sunrise</ListGroup.Item>
                                        <ListGroup.Item action>{sunrise}</ListGroup.Item>
                                        <ListGroup.Item action variant="info">Sunset</ListGroup.Item>
                                        <ListGroup.Item action>{sunset}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </>
                        )
                    })}
                </>
            )
        }
    } else {
        return (
            <h1>No location exists for this url</h1>
        )
    }
}

export default Location;