import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";

const GuestRoute = ({ children }) => {

    const loggedIn = Auth.loggedIn();

    if (loggedIn) {
        return <Navigate to="/" />;
    };

    return children

};

export default GuestRoute;