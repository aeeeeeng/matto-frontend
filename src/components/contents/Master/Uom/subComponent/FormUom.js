import React from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import '../../../../main-pannel/Modal.css';
import Aux from '../../../../../hoc/Aux';
import Block from '../../../../partials/loadings/block/Block';
import {saveUom, endAddPage, showUom, updateUom} from '../../../../../store/actions/uomAction';

class FormUom extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false
    }

    state = {
        loading: false,
        name: '',
        full_name: '',
        error: false,
        errors: {}
    }

    componentDidMount() {
        this._isMounted = true;
        if(this.props.currentId !== null && this._isMounted) {
            this._isMounted && this.setState({loading: true});
            this.props.showUom(this.props.currentId)
            .then(res => {
                const {data} = res.data;
                this.setState({name: data.name, full_name: data.full_name})
                this._isMounted && this.setState({loading: false});
            })
            .catch(error => {
                toastr.error(error.data.message, '-');
                this._isMounted && this.setState({loading: false});
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
     }

    handleChange = (e) => {
        if(this.state.errors[e.target.id]) {
            let errors = {...this.state.errors}
            delete errors[e.target.id];
            this.setState({
                [e.target.id]: e.target.value,
                errors
            });
        } else {
            this.setState({ [e.target.id] : e.target.value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.currentId !== null) {
            this.update();
        } else {
            this.save();
        }
    }

    save = () => {
        const payload = {name: this.state.name, full_name: this.state.full_name}
        this._isMounted && this.setState({loading: true});
        this.props.saveUom(payload)
        .then(res => {
            const response = res.data;
            toastr.success(response.message, `(${response.data.full_name}) saved to database`);
            this.props.endAddPage();
            this._isMounted && this.setState({loading: false});
            this.props.reloadTable(1);
        })
        .catch(error => {
            const {message} = error.data;
            if(typeof message === 'string') {
                toastr.error('Something Wrong', message);
            }
            this._isMounted && this.setState({error: true, errors: message});
            this._isMounted && this.setState({loading: false});
        })
    }

    update = () => {
        const payload = {name: this.state.name, full_name: this.state.full_name}
        const id = this.props.currentId;
        this._isMounted && this.setState({loading: true});
        this.props.updateUom(payload, id)
        .then(res => {
            const response = res.data;
            toastr.success(response.message, `(${response.data.full_name}) saved to database`);
            this.props.endAddPage();
            this._isMounted && this.setState({loading: false});
            this.props.reloadTable(1);
        })
        .catch(error => {
            const {message} = error.data;
            if(typeof message === 'string') {
                toastr.error('Something Wrong', message);
            }
            this._isMounted && this.setState({error: true, errors: message});
            this._isMounted && this.setState({loading: false});
        })
    }

    render() {
        return (
            <Aux>
                <Modal size="lg" show={this.props.showForm} onHide={this.props.endAddPage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        {this.state.loading && (<Block/>)}
                        <Modal.Body>
                            <Row>
                                <Col lg="12">
                                    <Form.Group >
                                        <Form.Label>Uom Name</Form.Label>
                                        <Form.Control type="text" style={{maxWidth: '40%'}} placeholder="The name must unique and max 2 character" id="name" name="name" 
                                        className={`${ (this.state.error && this.state.errors.name) ? 'is-invalid' : '' }`}
                                        value={this.state.name} onChange={(e) => this.handleChange(e)}></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Uom Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="The full name must unique" id="full_name" name="full_name" 
                                        className={`${ (this.state.error && this.state.errors.full_name) ? 'is-invalid' : '' }`}
                                        value={this.state.full_name} onChange={(e) => this.handleChange(e)}></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors.full_name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.props.endAddPage()}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                {this.state.loading ? (
                                    <div className="form-icon">
                                        <FontAwesomeIcon icon={faCircleNotch} spin />
                                    </div>
                                ) : 'Save' }
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentId: state.uom.currentId,
        showForm: state.uom.showForm
    }
}

const dispatchToProps = dispatch => {
    return {
        saveUom: payload => dispatch(saveUom(payload)),
        endAddPage: () => dispatch(endAddPage()),
        showUom: (id) => dispatch(showUom(id)),
        updateUom: (payload, id) => dispatch(updateUom(payload, id))
    }
}

export default connect(mapStateToProps, dispatchToProps)(FormUom);