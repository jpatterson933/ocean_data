import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";

import { VERIFY_USER } from "../../utils/mutations";

const EmailVerification = () => {

    const navigate = useNavigate();
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [verifyUser, { data, loading, error }] = useMutation(VERIFY_USER);
    const token = localStorage.getItem("id_token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await verifyUser({
                variables: {
                    token: token,
                    confirmationNumber: parseInt(confirmationNumber)
                },
            })

            console.log(response)

            if (response.data.verifyEmail.isVerified) {
                navigate("/");
            }


        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        setConfirmationNumber(event.target.value);
    }



    if (loading) {
        return <h1>Verifying Email...</h1>
    }

    if (error) {
        return <h1>There was an errror verifying your email. Please try again</h1>
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="confirmationNumber">Enter the confirmation number sent to your email</label>
            <input
                type="number"
                id="confirmationNumber"
                value={confirmationNumber}
                onChange={handleChange}
            />
            <button type="submit">Verify Email</button>

        </form>
    )



};

export default EmailVerification;