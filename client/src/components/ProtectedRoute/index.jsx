import { Navigate, useRoutes } from "react-router-dom";
import Auth from "../../utils/auth";

const ProtectedRoute = ({children, ...rest}) => {
    const loggedIn = Auth.loggedIn();

    if(!loggedIn){
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;