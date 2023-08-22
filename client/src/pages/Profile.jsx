import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// bootstrap styling
import ListGroup from 'react-bootstrap/ListGroup';

function Profile() {

    const { data, loading } = useQuery(QUERY_ME)

    if (loading) {
        return (
            <h1>Loading data...</h1>
        )
    }
    if (data) {
        const user = data.me;

        console.log(data, "test")
        return (
            <>
                <h1>Welcome {user.email}</h1>
                <p>There is not much here now, but this site will continue to grow and develop into something amazing.</p>
                <h2>This is the last city you looked up.</h2>
                {user.locations.map(location => (
                    <ListGroup key={location._id}>
                        <ListGroup.Item key={location.longitude}>
                            <a href={`location/${location._id}`}>
                                {location.name}
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </>
        )
    }
}

export default Profile;