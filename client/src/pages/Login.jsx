import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        <>
            <h1>Please Login</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We will never share your email with anyone.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="*********"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        Never share your password.
                    </Form.Text>
                </Form.Group>
                <Button variant="dark" type="submit">Login</Button>
            </Form>
        </>
    )
}

export default Login;