import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import './LoginForm.css';

import logo from '../../../../assets/img/logo.jpeg';

import {Card} from 'react-bootstrap';

const LoginForm = props => {
    return(
        <form className="form">
            <Card className="card-login">
                <Card.Header className="card-header-rose text-center">
                    <Card.Title>Login</Card.Title>
                    <div className="logo-login">
                        <img src={logo} alt="logo"/>
                    </div>
                </Card.Header>
                <Card.Body>
                    <p className="card-description text-center">MATTO (Cafe & Bistro) Kalisat</p>
                    <span className="bmd-form-group">
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text flat">
                                <div className="material-icon">
                                    <FontAwesomeIcon icon={faUser}/>
                                </div>
                            </span>
                        </div>
                            <input type="text" className="form-control flat" placeholder="Your Username..." />
                        </div>
                    </span>
                    <span className="bmd-form-group">
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text flat">
                                <div className="material-icon">
                                    <FontAwesomeIcon icon={faKey}/>
                                </div>
                            </span>
                        </div>
                            <input type="password" className="form-control flat" placeholder="Your Passwiord..." />
                        </div>
                    </span>
                </Card.Body>
                <Card.Footer className="justify-content-center">
                    <button type="submit" className="btn btn-orange btn-link btn-lg"> Lets Go </button>
                </Card.Footer>
            </Card>
        </form>
    );
}

export default LoginForm;