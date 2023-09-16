import { useQuery } from "@apollo/client";

import { useParams } from 'react-router-dom';

import { QUERY_LOCATION } from "../utils/queries";

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

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

            function createWindDataObject(weatherData) {
                let windData = [];

                weatherData.map(thirdHour => {
                    let windMph = (thirdHour.wind.speed * 2.23693629).toFixed(2);
                    let gustMph = (thirdHour.wind.gust * 2.23693629).toFixed(2);
                    let hourlyTime = thirdHour.dt_txt.split(" ")[1].split(":")[0];
                    const dataObject = {
                        date: hourlyTime,
                        windSpeed: windMph,
                        gustSpeed: gustMph
                    }

                    windData.push(dataObject);
                })
                // console.log(windData)

                return windData;
            }
            console.log(weatherData, "weatherdata")
            function createTemperatureDataObject(weatherData) {
                let temperatureData = [];
                weatherData.map(thirdHour => {
                    let hourlyTime = thirdHour.dt_txt.split(" ")[1].split(":")[0];
                    let tempInFahrenheit = ((thirdHour.main.temp - 273.15) * 1.8 + 32).toFixed(2);
                    let feelsLikeInFahrenheit = ((thirdHour.main.feels_like - 273.15) * 1.8 + 32).toFixed(2)
                    const dataObject = {
                        date: hourlyTime,
                        temperature: tempInFahrenheit,
                        feelsLike: feelsLikeInFahrenheit,
                    }
                    temperatureData.push(dataObject);
                })

                return temperatureData;
            }

            function createCloudDataObject(weatherData) {
                let cloudData = [];

                weatherData.map(thirdHour => {
                    let hourlyTime = thirdHour.dt_txt.split(" ")[1].split(":")[0];
                    let cloudsMeasurement = thirdHour.clouds.all;
                    let visibilityMeasurement = thirdHour.visibility;

                    let percentageVisible = ((visibilityMeasurement/10000) * 100).toFixed(0)
                    const dataObject = {
                        date: hourlyTime,
                        cloudCoverage: cloudsMeasurement,
                        visibility: percentageVisible

                    }
                    // console.log(cloudsMeasurement.clouds)
                    cloudData.push(dataObject);
                })
                return cloudData;
            }

            const windWeatherData = createWindDataObject(weatherData);
            const temperatureData = createTemperatureDataObject(weatherData);
            const cloudData = createCloudDataObject(weatherData);

            // console.log(visibilityData, "test")

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
                    <h3>Wind & Gust Data for next five days (mph)</h3>
                    <LineChart width={730} height={250} data={windWeatherData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis type="number" domain={[0, 25]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" />
                        <Line type="monotone" dataKey="gustSpeed" stroke="#82ca9d" />
                    </LineChart>
                    <p>This data is broken down into 3 hour increments.</p>
                    <h3>Temperature Data for next five days (Fahrenheit)</h3>
                    <LineChart width={730} height={250} data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis type="number" domain={[0, 125]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                        <Line type="monotone" dataKey="feelsLike" stroke="#82ca9d" />
                    </LineChart>
                    <h3>Cloud Coverage in the skies</h3>
                    <LineChart width={730} height={250} data={cloudData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis type="number" domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cloudCoverage" stroke="#8884d8" />
                        <Line type="monotone" dataKey="visibility" stroke="#82ca9d" />
                    </LineChart>
                    <p>% of Clouds covering the sky & visible sky</p>
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