import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr';

import './Login.css';

import LoginForm from './LoginForm/LoginForm';
import Aux from '../../../hoc/Aux';
import {loginAction, loginResponse} from '../../../store/actions/authActions';

class Login extends React.Component {

    state = {
        email: null,
        password: null,
        error: false,
        errors: {}
    }

    handleChange = (e) => {
        if(this.state.errors[e.target.id]) {
            let errors = {...this.state.errors}
            delete errors[e.target.id];
            this.setState({
                [e.target.id] : e.target.value,
                errors
            })
        } else {
            this.setState({ [e.target.id] : e.target.value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const payload = {email: this.state.email, password: this.state.password}
        this.props.loginAction(payload).then(data => {
            const {Authorization} = data.headers;
            const dataDispatch = {type: true, token: Authorization};
            this.props.loginResponse(dataDispatch);
        }).catch(resp => {
            const dataDispatch = {type: false}
            const {message} = resp.response.data;
            if(typeof message === 'string') {
                toastr.warning('Login Failed', message);
            }
            this.props.loginResponse(dataDispatch);
            this.setState({
                error: true,
                errors: message  
            })
        })
    }

    onDismiss = () => {
        this.setState({ errors: {} })
    }

    render() {
        return(
            <Aux>
                <div className="wrapper wrapper-full-page">
                    <div className="page-header login-page header-filter">
                        <Container>
                            <Row>
                                <Col lg="4" md="6" sm="8" className="mr-auto ml-auto">
                                    <LoginForm 
                                    handleSubmit={this.handleSubmit}
                                    state={this.state} 
                                    handleChange={this.handleChange} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Aux>
        )
    }

}

const dispatchToProps = dispatch => {
    return {
        loginAction: (payload) => dispatch(loginAction(payload)),
        loginResponse: (data) => dispatch(loginResponse(data))
    }
}

export default connect(null, dispatchToProps)(Login);