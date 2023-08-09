import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import LoginSignupForm from "../components/LoginSignupForm";

function Signup() {

    const [formState, setFormState] = useState({ email: "", password: "" });
    const [addUser] = useMutation(ADD_USER);

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
        <LoginSignupForm
            formTitle="Signup"
            onSubmit={handleFormSubmit}
            onChange={handleChange}
            emailMessage="We will never share your email with anyone. You must be able to verify email."
            passwordMessage="Password must be between 6 and 18 characters, must have upper and lowercase letters, digits and at minimum one special character."
            buttonTitle="Signup"
        />
    )
}

export default Signup;