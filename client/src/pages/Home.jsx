import Card from 'react-bootstrap/Card';

function Home() {
    return (
        <>
            <h1>Ocean Data</h1>
            <Card>
                <Card.Body>
                    <Card.Title>
                        What is Ocean Data about?
                    </Card.Title>
                    <Card.Text>
                        Ocean data is simple. Find cities near the ocean, look at the weather and discover all types of stuff by looking at the ocean weather data.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>
                        Select a city and get the weather
                    </Card.Title>
                    <Card.Text>
                        The city will have an on land weather forecast readily available.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>
                        Explore the data bout the ocean near that city.
                    </Card.Title>
                    <Card.Text>
                        Water temperature. Wave height, tides, winds and much much more.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Stay tuned for major site updates!
                    </Card.Title>
                    <Card.Text>
                        Much more will be added as the site continues to grow.

                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Home;