import Auth from "../../utils/auth";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";

function NavigationBar() {
    if (Auth.loggedIn()) {
        return (
            <ListGroup horizontal>
                <ListGroup.Item>
                    <Link to="/">Home</Link>

                </ListGroup.Item>
                <ListGroup.Item>
                    <a href="/" onClick={(() => Auth.logout())}>
                        Logout
                    </a>
                </ListGroup.Item>
            </ListGroup>
        )
    } else {
        return (
            <ListGroup horizontal>
            <ListGroup.Item>
                <Link to="/login">Login</Link>

            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/signup">Signup</Link>
            </ListGroup.Item>
        </ListGroup>
        )
    }

    return (
        <>
        </>
    )
}

export default NavigationBar;