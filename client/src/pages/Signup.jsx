import {useState} from "react";
import {useMutation} from "@apollo/client";
import Auth from "../utils/auth";
import {ADD_USER} from "../utils/mutations";

function Signup() {

    const [formState, setFormState] = useState({email: "", password: ""});
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
        Auth.login(token);

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    }




    return (

        <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email</label>
            <input
                placeholder="email"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input 
                placeholder="******"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
            />
            <button type="submit">Sign Up</button>
        </form>



    )
}

export default Signup;