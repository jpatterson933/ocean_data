import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import LoginSignupForm from "../components/LoginSignupForm";

function Login() {

    const [formState, setFormState] = useState({ email: "", password: "" });
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await loginUser({
                variables: {
                    email: formState.email,
                    password: formState.password,
                }
            });
            const token = mutationResponse.data.loginUser.token;
            Auth.login(token);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <LoginSignupForm
            formTitle="Please Login"
            onSubmit={handleFormSubmit}
            onChange={handleChange}
            emailMessage="We will never share your email with anyone."
            passwordMessage="Never share your password."
            buttonTitle="Login"
        />
    )
}

export default Login;