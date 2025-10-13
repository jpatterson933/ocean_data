import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <nav>
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
            </Navbar>
        </nav>
    )
}

export default NavigationBar;