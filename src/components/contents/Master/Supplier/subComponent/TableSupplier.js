import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Aux from '../../../../../hoc/Aux';

const TableSupplier = props => {
    return (
        <Aux>
            <Row>
                <Col lg="12">
                    <div className="table-responsive">
                        <table className="table table-hover matto-table nowrap">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Image</th>
                                    <th>Created At</th>
                                    <th>Last Change Date</th>
                                    <th>Last Change By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{props.children}</tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Aux>
    );
}

export default TableSupplier