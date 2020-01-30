import React from 'react';
import './Confirm.css';
import Aux from "../../../hoc/Aux";

const Confirm = props => {
    return (
        <Aux>
            <Modal size="sm" show={this.props.showForm} onHide={this.props.endAddPage}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.endAddPage()}>
                        No
                    </Button>
                    <Button type="submit" variant="primary">Yes</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}

export default Confirm;