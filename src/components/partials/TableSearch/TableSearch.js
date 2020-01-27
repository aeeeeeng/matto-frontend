import React from 'react';
import {FormControl, Form} from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";
import Aux from '../../../hoc/Aux';
import './TableSearch.css';

const TableSearch = props => {
    let lengthPage = [10, 20, 50, 100, 200];
    if(props.lengthPage) {
        lengthPage = props.lengthPage;
    }

    const options = lengthPage.map((data, i) => (<option key={i} val={data}>{data}</option>));

    return(
        <Aux>
            <Row>
                <Col lg="6">
                    <div className="left">
                        <Form.Control as="select" className="form-control-sm mr-sm-2 flat input-search" onChange={(e) => props.change(1, e.target.value)}>
                            {options}
                        </Form.Control>
                    </div>
                </Col>
                <Col lg="6">
                    <div className="right">
                        <FormControl type="text" placeholder="Search" className="form-control-sm mr-sm-2 flat input-search" onKeyUp={(e) => props.change(1, props.optionPaginate.per_page, e.target.value)} />
                    </div>
                </Col>
            </Row>
        </Aux>
    );
}

export default TableSearch;