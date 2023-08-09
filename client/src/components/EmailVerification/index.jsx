import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { VERIFY_USER } from "../../utils/mutations";

//bootstrap
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";

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
        <Form onSubmit={handleSubmit}>
            <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg">Validation #</InputGroup.Text>
                <Form.Control
                    aria-label="Large"
        
                    id="confirmationNumber"
                    value={confirmationNumber}
                    onChange={handleChange}
                />
                <Button variant="dark" type="submit">Validate Email</Button>
            </InputGroup>
        </Form>
    )
};

export default EmailVerification;