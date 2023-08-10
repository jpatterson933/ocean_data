import { Navigate, useLocation } from "react-router-dom";

import Auth from "../../utils/auth";
import userVerifiedHook from "../../hooks/userVerifiedHook";

import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = ({ children }) => {

    const { isVerified, loading } = userVerifiedHook();

    const location = useLocation();
    const loggedIn = Auth.loggedIn();

    if (loading) {
        return (
            <Spinner animation="border" role="loading">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    };

    if (loggedIn) {
        if (location.pathname === "/verify_email" && isVerified) {
            return <Navigate to="/" />
        };

        if (location.pathname !== "/verify_email" && !isVerified) {
            return <Navigate to="/verify_email" />;
        };

    } else if (!loggedIn) {

        if (!["/login", "/signup"].includes(location.pathname)) {
            return <Navigate to="/login" />
        };
    };

    return children;
};

export default ProtectedRoute;