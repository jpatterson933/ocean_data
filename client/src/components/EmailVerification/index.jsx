import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useParams, Navigate } from "react-router-dom";

import { VERIFY_USER } from "../../utils/mutations";

const EmailVerification = () => {
    const { token } = useParams();
    


    //define mutation
    const [verifyUser, { data, loading, error }] = useMutation(VERIFY_USER);

    useEffect(() => {
        verifyUser({ variables: { token } });
    }, [token, verifyUser]);

    if (loading) {
        return <h1>Verifying Email...</h1>
    }

    if (error) {
        return <h1>There was an errror verifying your email. Please try again</h1>
    }

    if (data?.verifyEmail) {
        return (
            <>
                <h1>Email verification successful! You are now being redirected!</h1>
                <Navigate to="/" />
            </>
        )
    }

    return null;
};

export default EmailVerification;