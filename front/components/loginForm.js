import {Form,Button} from 'react-bootstrap';
const Login = () => {
    return(
        <>
        <Form style ={{border:"1px solid black",height:'400px',backgroundColor:'#FF9DFF'}}>
            <Form.Text style={{textAlign:'center'}}>
                hello
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <div style ={{border:"1px solid black",height:'150px',margin: '50px'}}>
            hello
        </div>
        </>
    )
}

export default Login;