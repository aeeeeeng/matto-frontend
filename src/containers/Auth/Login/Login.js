import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr';

import './Login.css';

import LoginForm from './LoginForm/LoginForm';
import Aux from '../../../hoc/Aux';
import {loginAction, loginResponse} from '../../../store/actions/authActions';
import {encrypt} from '../../../config/generate';

class Login extends React.Component {

    state = {
        email: null,
        password: null,
        error: false,
        errors: {},
        loading: false
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
        this.setState({loading: true});
        const payload = {email: this.state.email, password: this.state.password}
        this.props.loginAction(payload).then(response => {
            const {authorization} = response.headers;
            const {isAdmin} = response.data.data;
            var keyIsAdmin = '';
            if(isAdmin === true) {
                keyIsAdmin = 'OK';
            } else {
                keyIsAdmin = 'NO';
            }
            localStorage.setItem('isAdmin', encrypt(keyIsAdmin));
            const dataDispatch = {type: true, authorization, keyIsAdmin};
            this.props.loginResponse(dataDispatch);
            this.setState({loading: false});
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
            this.setState({loading: false});
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
                                <Col lg="4" md="6" sm="8" className="mr-auto ml-auto animate bounceIn">
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