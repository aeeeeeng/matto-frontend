import React from 'react';
import {Card} from 'react-bootstrap';

import Aux from '../../../hoc/Aux';

class Master extends React.Component {

    render() {
        return(
            <Aux>
            <Card>
                <Card.Header as="h5">Master</Card.Header>
                <Card.Body>
                    <Card.Title>This is Title</Card.Title>
                    <Card.Text>
                        This is content body
                    </Card.Text>
                    
                </Card.Body>
            </Card>
            </Aux>
        );
    }

}

export default Master;