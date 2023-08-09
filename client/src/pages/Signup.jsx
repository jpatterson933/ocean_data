import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Signup() {

    const [formState, setFormState] = useState({ email: "", password: "" });
    const [addUser] = useMutation(ADD_USER);
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.signUp(token);


    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    return (
        <>
            <h1>Signup</h1>

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
                        We will never share your email with anyone. You must be able to verify email.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="**********"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        Password must be between 6 and 18 characters, must have upper and lowercase letters, digits and at minimum one special character.
                    </Form.Text>
                </Form.Group>
                <Button variant="dark" type="submit">Signup</Button>
            </Form>
        </>



    )
}

export default Signup;