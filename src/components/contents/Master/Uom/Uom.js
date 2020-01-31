import React from 'react';
import {Card, Button, ButtonToolbar} from 'react-bootstrap';
import Aux from '../../../../hoc/Aux';
import moment from 'moment';
import 'animate.css';
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr';
import {RowEmpty, RowLoading} from '../../../partials/tableOptions/TableOptions'
import Paginations from '../../../partials/paginations/Paginations';
import TableSearch from '../../../partials/TableSearch/TableSearch';
import DateFilter from '../../../partials/dateFilter/DateFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import TableUom from './subComponent/TableUom';
import FormUom from './subComponent/FormUom';
import {fetchUom, showAddPage, endAddPage, showEditPage, deleteUom} from '../../../../store/actions/uomAction';

class Uom extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false
    }

    state = {
        loading: false,
        lengthPage: [10, 20, 50, 100, 200],
        dateStart: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD')
    }

    componentDidMount() {
        this._isMounted = true;
        this.asyncUom(1);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeRangeDate = (date, type) => {
        let dateStart, dateEnd;
        if(type === 'dateStart') {
            dateStart = moment(date).format('YYYY-MM-DD');
            this._isMounted && this.setState({dateStart});
        } else if (type === 'dateEnd') {
            dateEnd = moment(date).format('YYYY-MM-DD');
            this._isMounted && this.setState({dateEnd});
        }
    }

    asyncUom = async (pageNumber, perPage = 10, keyword = null) => {
        if(this._isMounted) {
            const dateRange = {
                dateStart : this.state.dateStart,
                dateEnd : this.state.dateEnd
            }
            this._isMounted && this.setState({loading: true})
            this.props.fetchUom(perPage, pageNumber, keyword, dateRange)
            .then(() => this._isMounted && this.setState({loading: false}))
            .catch(()=> this._isMounted && this.setState({loading: false}));
        }
    }

    delete = id => {
        this.props.deleteUom(id)
        .then(res => {
            toastr.success(`${res.data.data.full_name} Deleted`);
            this.asyncUom(1);
        })
        .catch(error => toastr.error(error.data.message));
    }

    render() {
        let rows;
        const {uom} = this.props;
        if(uom.length > 0) {
            rows = uom.map((uomData, i) => (
                <tr key={i}>
                    <td>{uomData.code}</td>
                    <td>{uomData.name}</td>
                    <td>{uomData.full_name}</td>
                    <td>{uomData.created_at}</td>
                    <td>{uomData.updated_at}</td>
                    <td>{uomData.updated_by}</td>
                    <td>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={() => this.props.showEditPage(uomData.id)} size="sm">
                                <FontAwesomeIcon icon={faWrench}></FontAwesomeIcon>
                            </Button>
                            <Button variant="danger" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(uomData.id) } } size="sm">
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            )); 
        } else {
            rows = (<RowEmpty colSpan='7'>Data not found</RowEmpty>);
        }

        const {optionPaginate} = this.props;
        
        const loading = (<RowLoading colSpan='7'>Loading</RowLoading>);

        return (
            <Aux>
                <Card className="animate animated bounceInRight">
                    <Card.Header as="h5">UOM (Unit Of Measure)</Card.Header>
                    <Card.Body>
                        <DateFilter dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} handleChange={this.changeRangeDate} submit={this.asyncUom}/>
                        <ButtonToolbar>
                            <Button variant="warning" onClick={() => this.props.showAddPage()} size="md">Add Product Type</Button>
                        </ButtonToolbar>
                        <TableSearch optionPaginate={optionPaginate} lengthPage={this.state.lengthPage} change={this.asyncUom}/>
                        <TableUom>
                            {this.state.loading ? loading : rows}
                        </TableUom>
                        <Paginations optionPaginate={optionPaginate} fetch={this.asyncUom}/>
                    </Card.Body>
                </Card>
                {(this.props.showForm) && <FormUom reloadTable={this.asyncUom}></FormUom>}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        optionPaginate: state.uom.optionPaginate,
        uom: state.uom.uom,
        response: state.uom.response,
        currentId: state.uom.currentId,
        showForm: state.uom.showForm   
    }
}

const dispatchToProps = dispatch => {
    return {
        fetchUom : (perPage, page, keyword, dateRange) => dispatch(fetchUom(perPage, page, keyword, dateRange)),
        showAddPage: () => dispatch(showAddPage()),
        showEditPage: (id) => dispatch(showEditPage(id)),
        endAddPage: () => dispatch(endAddPage()),
        deleteUom: (id) => dispatch(deleteUom(id)),
    }
}

export default connect(mapStateToProps, dispatchToProps)(Uom);