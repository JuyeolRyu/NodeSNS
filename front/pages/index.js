import {Container,Button,Row,Col} from 'react-bootstrap';
const Index = () => {
    return(
        <>
            <Container className="p-3" style={{marginTop:'5%', marginBottom:'5%'}}>
                <Row style={{height: '80%'}}>
                    <Col md={2}>col1</Col>
                    <Col d-block d-md-none={'auto'}><img src="../images/login_image.png"/></Col>
                    <Col md={4} style={{backgroundColor:'#7FFFD4'}}>col3</Col>
                    <Col md={2}>col4</Col>
                </Row>
                <Row style={{height: '30%'}}><Button>hello</Button></Row>
            </Container>
{/*             
            <body>
            <div className="container" style={{marginTop:'5%', marginBottom:'5%'}}>
                <div className="row d-flex flex-column h-100">
                    <div class="col-md-2"></div>
                    <img class="col-md-4 h-50" src="../images/login_image.png"/>
                    <div class="col-md-4 h-50" style={{backgroundColor:'#7FFFD4'}}></div>
                    <div class="col-md-2"></div>
                </div>
            </div>
            <div style={{align:'center'}}>
                footer
            </div>
            </body> */}
        </>
    );
};

export default Index;