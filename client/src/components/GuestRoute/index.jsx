import { Navigate, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
import userVerifiedHook from "../../hooks/userVerifiedHook";

const GuestRoute = ({ children }) => {

    const {isVerified, loading} = userVerifiedHook();

    const location = useLocation();
    const loggedIn = Auth.loggedIn();

    if(location.pathname === "/verify_email" && loggedIn && isVerified){
        return <Navigate to="/" />
    }

    if (location.pathname !== "/verify_email" && loggedIn && !isVerified) {
        return <Navigate to="/verify_email" />;
    };

    return children

};

export default GuestRoute;