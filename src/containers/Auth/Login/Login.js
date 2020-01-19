import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import './Login.css';

import LoginForm from './LoginForm/LoginForm';

import Aux from '../../../hoc/Aux';

class Login extends React.Component {

    state = {
        usernae: null,
        password: null
    }

    render() {
        return(
            <Aux>
                <div className="wrapper wrapper-full-page">
                    <div className="page-header login-page header-filter">
                        <Container>
                            <Row>
                                <Col lg="4" md="6" sm="8" className="mr-auto ml-auto">
                                    <LoginForm />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Aux>
        )
    }

}

export default Login;