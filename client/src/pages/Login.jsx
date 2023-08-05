import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(){

    const [formState, setFormState] = useState({ email: "", password: ""});
    const [loginUser, {error}] = useMutation(LOGIN_USER);

    const handleFormSubmit = async(event) => {
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
        } catch(error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };



    return(
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email</label>
            <input
                placeholder="email"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                placeholder="*******"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;