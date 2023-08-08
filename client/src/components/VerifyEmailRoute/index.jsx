import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";

const VerifyEmailRoute = ({ children }) => {

    const loggedIn = Auth.loggedIn();

    if (loggedIn) {
        return <Navigate to="/verify_email" />;
    };

    return children

};

export default VerifyEmailRoute;