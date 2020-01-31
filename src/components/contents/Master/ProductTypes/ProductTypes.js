import React from 'react';
import {Card, Button, ButtonToolbar} from 'react-bootstrap';
import Aux from '../../../../hoc/Aux';
import moment from 'moment';
import 'animate.css';
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr';
import {RowEmpty, RowLoading} from '../../../partials/tableOptions/TableOptions'
import TableProductTypes from './subComponent/TableProductTypes';
import Paginations from '../../../partials/paginations/Paginations';
import TableSearch from '../../../partials/TableSearch/TableSearch';
import DateFilter from '../../../partials/dateFilter/DateFilter';
import FormProductTypes from './subComponent/FormProductTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import {fetchProductTypes, showAddPage, showEditPage, deleteProductType} from '../../../../store/actions/productTypeActions';

class ProductTypes extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    state = {
        loading: false,
        lengthPage: [10, 20, 50, 100, 200],
        dateStart: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD')
    }   

    componentDidMount() {
        this._isMounted = true;
        this.asyncProductTypes(1);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    asyncProductTypes = async (pageNumber, perPage = 10, keyword = null) => {
        if(this._isMounted) {
            const dateRange = {
                dateStart : this.state.dateStart,
                dateEnd : this.state.dateEnd
            }
            this._isMounted && this.setState({loading: true})
            this.props.fetchProductTypes(perPage, pageNumber, keyword, dateRange)
            .then(() => this._isMounted && this.setState({loading: false}))
            .catch(()=> this._isMounted && this.setState({loading: false}));
        }
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

    changeLengthPage = (e) => {
        const length = e.target.value;
        this.asyncProductTypes(1, length);
    }

    delete = id => {
        this.props.deleteProductType(id)
        .then(res => {
            toastr.success(`${res.data.data.name} Deleted`);
            this.asyncProductTypes(1);
        })
        .catch(error => toastr.error(error.data.message));
    }


    render() {
        let rows;

        const {productTypes} = this.props;
        if (productTypes.length > 0) {
            rows = productTypes.map((productType, i) => (
                <tr key={i}>
                    <td>{productType.code}</td>
                    <td>{productType.name}</td>
                    <td>{productType.created_at}</td>
                    <td>{productType.updated_at}</td>
                    <td>{productType.updated_by}</td>
                    <td>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={() => this.props.showEditPage(productType.id)} size="sm">
                                <FontAwesomeIcon icon={faWrench}></FontAwesomeIcon>
                            </Button>
                            <Button variant="danger" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(productType.id) } } size="sm">
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            ));
        } else {
            rows = (<RowEmpty colSpan='6'>Data not found</RowEmpty>);
        }

        const {optionPaginate} = this.props;

        const loading = (<RowLoading colSpan='7'>Loading</RowLoading>);

        return (
            <Aux>
                <Card className="animate animated bounceInRight">
                    <Card.Header as="h5">Product Type List</Card.Header>
                    <Card.Body>
                        <DateFilter dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} handleChange={this.changeRangeDate} submit={this.asyncProductTypes}/>
                        <ButtonToolbar>
                            <Button variant="warning" onClick={() => this.props.showAddPage()} size="md">Add Product Type</Button>
                        </ButtonToolbar>
                        <TableSearch optionPaginate={optionPaginate} lengthPage={this.state.lengthPage} change={this.asyncProductTypes}/>
                        <TableProductTypes>
                            {this.state.loading ? loading : rows}
                        </TableProductTypes>
                        <Paginations optionPaginate={optionPaginate} fetch={this.asyncProductTypes}/>
                    </Card.Body>
                </Card>
                {(this.props.showForm) && (<FormProductTypes reloadTable={this.asyncProductTypes}></FormProductTypes>)}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        optionPaginate: state.productTypes.optionPaginate,
        productTypes: state.productTypes.productTypes,
        response: state.productTypes.response,
        currentId: state.productTypes.currentId,
        showForm: state.productTypes.showForm
    }
}

const dispatchToProps = dispatch => {
    return {
        fetchProductTypes: (perPage, page, keyword, dateRange) => dispatch(fetchProductTypes(perPage, page, keyword, dateRange)),
        showAddPage: () => dispatch(showAddPage()),
        showEditPage: (id) => dispatch(showEditPage(id)),
        deleteProductType: (id) => dispatch(deleteProductType(id))
    }
}

export default connect(mapStateToProps, dispatchToProps)(ProductTypes);