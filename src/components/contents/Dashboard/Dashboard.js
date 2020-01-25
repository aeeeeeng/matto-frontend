import React from 'react';
import {Card} from 'react-bootstrap';

import Aux from '../../../hoc/Aux';
import 'animate.css'

class Dashboard extends React.Component {

    render() {
        return(
            <Aux>
            <Card className="animate bounceIn">
                <Card.Header as="h5">Dashboard</Card.Header>
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

export default Dashboard;