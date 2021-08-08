import {Container,Button,Image,Row,Col} from 'react-bootstrap';
import Login from '../components/loginForm'
import LoginForm from '../Login_v3/js/main'
const Index = () => {
    return(
        <Container className="p-3" style={{marginTop:'5%', marginBottom:'5%'}}>
            <Row style={{height: '80%'}}>
                <Col md={2}></Col>
                <Col md={'auto'}><Image src="../images/login_image.png" rounded style={{height:'600px'}}/></Col>
                <Col md={4} ><LoginForm></LoginForm></Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    );
};

export default Index;