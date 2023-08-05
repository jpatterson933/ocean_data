import Auth from "../../utils/auth";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

function NavigationBar() {
    if(Auth.loggedIn()) {
        return (
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Link to="/">Home</Link>
                </Nav.Item>
            </Nav>
        )
    }

    return(
        <>
        </>
    )
}

export default NavigationBar;