import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';

import Aux from '../../hoc/Aux';
import 'animate.css';

class ExamplePage extends React.Component {

    render() {
        return(
            <Aux>
                <Card className="animate animated bounceInRight">
                    <Card.Header as="h5">Blank Page</Card.Header>
                    <Card.Body>
                        <Card.Title>This is Title</Card.Title>
                        <Card.Text>
                            This is content body
                        </Card.Text>
                        <Card>
                            <Card.Header as="h5">Blank Page</Card.Header>
                            <Card.Body>
                                <Card.Title>This is Title</Card.Title>
                                <Card.Text>
                                    This is content body
                                </Card.Text>
                                <Card>
                                    <Card.Header as="h5">Blank Page</Card.Header>
                                    <Card.Body>
                                        <Card.Title>This is Title</Card.Title>
                                        <Card.Text>
                                            This is content body
                                        </Card.Text>
                                        <Row>
                                            <Col col="6">
                                                <Card>
                                                    <Card.Header as="h5">Blank Page</Card.Header>
                                                    <Card.Body>
                                                        <Card.Title>This is Title</Card.Title>
                                                        <Card.Text>
                                                            This is content body
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>  
                                            </Col>
                                            <Col col="6">
                                                <Card>
                                                    <Card.Header as="h5">Blank Page</Card.Header>
                                                    <Card.Body>
                                                        <Card.Title>This is Title</Card.Title>
                                                        <Card.Text>
                                                            This is content body
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card> 
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>  
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </Aux>
        );
    }

}

export default ExamplePage;