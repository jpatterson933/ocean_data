import Auth from "../../utils/auth";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom";

function NavigationBar() {
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <Navbar fixed="top" bg="dark" data-bs-theme="dark">
                    <Nav variant="underline" className="me-auto">
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="search_location">Ocean</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav variant="tabs" className="justify-content-end">
                        <Nav.Item as="li">
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
                    <Nav variant="tabs" className="me-auto">
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            );
        };
    };
    return (
        <nav>
            {showNavigation()}
        </nav>
    )
}

export default NavigationBar;