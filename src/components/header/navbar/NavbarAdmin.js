import React from 'react';
import {Navbar, Container, Row, Col, Form, FormControl, Button} from 'react-bootstrap';
import Aux from '../../../hoc/Aux';

import './NavbarAdmin.css';

import User from './user/User';
import Notification from './notification/Notification';

class NavbarAdmin extends React.Component {

    state = {
        userCollapse : false,
        notifCollapse : false
    }

    // componentDidMount() {
    //     const ini = this;
    //     const body = document.querySelector('body');
    //     body.addEventListener('click', function(e){
    //         ini.handleClickCollapse(e, null);
    //     })
    // }

    handleClickCollapse = (event, type) => {
        event.preventDefault();
        if(type === 'userCollapse') {
            this.setState({userCollapse: !this.state.userCollapse});
        } else if(type === 'notifCollapse') {
            this.setState({notifCollapse: !this.state.notifCollapse});
        } else {
            this.setState({notifCollapse: false, userCollapse: false});
        }
    }

    render() {
        return (
            <Aux>
                <Navbar bg="dark" variant="">
                    <Container>
                        <Row className="full-width">
                            <Col lg="12">
                                <div className="header-group">
                                    <Form inline>
                                        <FormControl type="text" placeholder="Search" className="form-control-sm mr-sm-2 flat" />
                                        <Button variant="outline-warning btn-sm flat">Search</Button>
                                    </Form>
                                    <Notification isCollapse={this.state.notifCollapse} collapseCLick={this.handleClickCollapse} />
                                    <User isCollapse={this.state.userCollapse} collapseCLick={this.handleClickCollapse}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </Aux>
        );
    }
}

export default NavbarAdmin;