import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginSignupForm(props) {

    return (
        <>
            <h1>{props.formTitle}</h1>
            <Form onSubmit={props.onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        id="email"
                        onChange={props.onChange}
                    />
                    <Form.Text className="text-muted">
                        {props.emailMessage}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="**********"
                        name="password"
                        type="password"
                        id="password"
                        onChange={props.onChange}
                    />
                    <Form.Text className="text-muted">
                        {props.passwordMessage}
                    </Form.Text>
                </Form.Group>
                <Button variant="dark" type="submit">{props.buttonTitle}</Button>
            </Form>
        </>



    )
}

export default LoginSignupForm;
