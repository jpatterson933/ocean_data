import { useQuery } from "@apollo/client";

import { useParams } from 'react-router-dom';

import { QUERY_LOCATION } from "../utils/queries";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

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

            function convertTime(timezone, timestamp) {
                const dateTime = new Date(timestamp * 1000);
                console.log(dateTime)
                const offsetMilliseconds = timezone * 1000;
                const timeInTimezone = new Date(dateTime.getTime() + offsetMilliseconds);
                // Extract the components of the date and time
                const hours = timeInTimezone.getUTCHours();
                const minutes = String(timeInTimezone.getUTCMinutes()).padStart(2, '0');
                const seconds = String(timeInTimezone.getUTCSeconds()).padStart(2, '0');
                const day = timeInTimezone.getUTCDate();
                const month = timeInTimezone.getUTCMonth() + 1;

                // Format the time with the specified format
                const formattedTime = `${month}/${day} at ${hours % 12 === 0 ? 12 : hours % 12}:${minutes}:${seconds}${hours >= 12 ? 'pm' : 'am'}`;

                return formattedTime;
            }

            const { name, countryCode, latitude, longitude, timezone, sunrise, sunset, weatherData } = data.locations[0]



            return (
                <>
                    <Card>
                        <Card.Title>{name}</Card.Title>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Country Code</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Time Zone</th>
                                    <th>Sunrise</th>
                                    <th>Sunset</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{countryCode}</th>
                                    <th>{latitude}</th>
                                    <th>{longitude}</th>
                                    <th>{timezone}</th>
                                    <th>{convertTime(timezone, sunrise)}</th>
                                    <th>{convertTime(timezone, sunset)}</th>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
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