import React from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import '../../../../main-pannel/Modal.css';
import Aux from '../../../../../hoc/Aux';
import Block from '../../../../partials/loadings/block/Block';
import {saveProductTypes, endAddPage, showProductType, updateProductTypes} from '../../../../../store/actions/productTypeActions';

class FormProductTypes extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false
    }

    state = {
        loading: false,
        name: '',
        error: false,
        errors: {}
    }

    componentDidMount() {
        this._isMounted = true;
        if(this.props.currentId !== null) {
            this._isMounted && this.setState({loading: true});
            this.props.showProductType(this.props.currentId)
            .then(res => {
                const {data} = res.data;
                this.setState({name: data.name})
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

    update = () => {
        const payload = {name: this.state.name}
        const id = this.props.currentId;
        this._isMounted && this.setState({loading: true});
        this.props.updateProductTypes(payload, id)
        .then(res => {
            const response = res.data;
            toastr.success(response.message, `(${response.data.name}) saved to database`);
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

    save = () => {
        const payload = {name: this.state.name}
        this._isMounted && this.setState({loading: true});
        this.props.saveProductTypes(payload)
        .then(res => {
            const response = res.data;
            toastr.success(response.message, `(${response.data.name}) saved to database`);
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

    render(){
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
                                        <Form.Label>Product Type Name</Form.Label>
                                        <Form.Control type="text" placeholder="The name must unique" id="name" name="name" 
                                        className={`${ (this.state.error && this.state.errors.name) ? 'is-invalid' : '' }`}
                                        value={this.state.name} onChange={(e) => this.handleChange(e)}></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors.name}
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
        );
    }
}

const mapStateToProps = state => {
    return {
        currentId: state.productTypes.currentId,
        showForm: state.productTypes.showForm
    }
}

const dispatchToProps = dispatch => {
    return {
        saveProductTypes: payload => dispatch(saveProductTypes(payload)),
        endAddPage: () => dispatch(endAddPage()),
        showProductType: (id) => dispatch(showProductType(id)),
        updateProductTypes: (payload, id) => dispatch(updateProductTypes(payload, id))
    }
}

export default connect(mapStateToProps, dispatchToProps)(FormProductTypes);

