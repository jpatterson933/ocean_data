import Auth from "../../utils/auth";
// bootstrap stuff
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom";

function NavigationBar() {

    function showNavigation() {

        if (Auth.loggedIn()) {
            return (
                <Navbar fixed="top" bg="dark" data-bs-theme="dark">
                    <Nav variant="tabs" className="me-auto">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>

                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav variant="tabs" className="justify-content-end">
                        <Nav.Item>

                            <Nav.Link href="/" onClick={(() => Auth.logout())}>
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            )
        } else {
            return (
                <Navbar fixed="top" bg="dark" data-bs-theme="dark">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                    </Nav>
                </Navbar>
            )
        }
    }

    return (
        <nav>
            {showNavigation()}
        </nav>
    )
}

export default NavigationBar;