import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Aux from '../../../../../hoc/Aux';

const TableUser = props => {
    return (
        <Aux>
            <Row>
                <Col lg="12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created at</th>
                            </tr>
                        </thead>
                        <tbody>{props.children}</tbody>
                    </table>
                </Col>
            </Row>
        </Aux>
    );
}

export default TableUser;