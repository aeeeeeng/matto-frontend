import React from 'react';
import {Col, Row, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DateFilter.css';
import Aux from '../../../hoc/Aux';
import moment from 'moment';

const DateFilter = props => {
    
    let {dateStart, dateEnd} = props;

    dateStart = moment(dateStart, 'YYYY-MM-DD').toDate();
    dateEnd = moment(dateEnd, 'YYYY-MM-DD').toDate();

    const changeLifeTime = (e) => {
        e.preventDefault();
        const dateStart = moment('1970-01-01', 'YYYY-MM-DD').toDate();
        const dateEnd = moment().toDate();
        props.handleChange(dateStart, 'dateStart');
        props.handleChange(dateEnd, 'dateEnd');
        setShadow();
    }

    const changeOneMonthAgo = (e) => {
        e.preventDefault();
        const dateStart = moment().subtract(1, 'months').toDate();
        const dateEnd = moment().toDate();
        props.handleChange(dateStart, 'dateStart');
        props.handleChange(dateEnd, 'dateEnd');
        setShadow();
    }

    const changeOneWeekAgo = (e) => {
        e.preventDefault();
        const dateStart = moment().subtract(1, 'weeks').toDate();
        const dateEnd = moment().toDate();
        props.handleChange(dateStart, 'dateStart');
        props.handleChange(dateEnd, 'dateEnd');
        setShadow();
    }

    const setShadow = () => {
        let dateStartElement = document.getElementsByClassName('dateStart')[0];
        let dateEndElement = document.getElementsByClassName('dateEnd')[0];
        dateStartElement.classList.add('shadow');
        dateEndElement.classList.add('shadow');
        setTimeout(() => {
            dateStartElement.classList.remove('shadow');
            dateEndElement.classList.remove('shadow');
        }, 1000);
    }

    return(
        <Aux>
            <div className="date-filter">
                <Row>
                    <Col md="12">
                        <center>
                            <div className="form">
                                <div className="field button-default">
                                    <Button variant="warning" onClick={(e) => changeLifeTime(e)} size="sm">Set to Life Time</Button>
                                    <Button variant="warning" onClick={(e) => changeOneMonthAgo(e)} size="sm">Set to 1 Month Ago</Button>
                                    <Button variant="warning" onClick={(e) => changeOneWeekAgo(e)} size="sm">Set to 1 Week Ago</Button>
                                </div>
                                <div className="field date-start">
                                    <DatePicker className="form-control form-control-sm flat dateStart" 
                                                dateFormat="yyyy-MM-dd"
                                                onChange={date => props.handleChange(date, 'dateStart')}
                                                selected={dateStart}
                                                selectsStart
                                                startDate={dateStart}
                                                endDate={dateEnd}
                                                withPortal 
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown />
                                </div>
                                <div className="field date-end">
                                        <DatePicker className="form-control form-control-sm flat dateEnd"
                                                    dateFormat="yyyy-MM-dd"
                                                    onChange={date => props.handleChange(date, 'dateEnd')}
                                                    selected={dateEnd}
                                                    selectsEnd
                                                    startDate={dateStart}
                                                    endDate={dateEnd}
                                                    minDate={dateStart}
                                                    withPortal 
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown />
                                </div>
                                <div className="field enter">
                                    <Button onClick={() => props.submit()} variant="warning" size="sm">Search</Button>
                                </div>
                            </div>
                        </center>
                    </Col>
                </Row>
            </div>
        </Aux>
    );

}

export default DateFilter;