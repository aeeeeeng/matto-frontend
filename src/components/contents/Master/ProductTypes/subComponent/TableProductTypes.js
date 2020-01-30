import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Aux from '../../../../../hoc/Aux';

const TableProductTypes = props => {
    return (
        <Aux>
            <Row>
                <Col lg="12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Last Change Date</th>
                                <th>Last Change By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{props.children}</tbody>
                    </table>
                </Col>
            </Row>
        </Aux>
    );
}

export default TableProductTypes;