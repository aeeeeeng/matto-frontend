import React from 'react';
import Aux from '../../../../hoc/Aux';
import {Card, Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {fetchSupplier} from '../../../../store/actions/supplierActions';
import {RowEmpty, RowLoading} from '../../../partials/tableOptions/TableOptions'
import TableSupplier from './subComponent/TableSupplier';
import ImageTable from '../../../partials/images/imageTable/ImageTable';
import Paginations from '../../../partials/paginations/Paginations';
import TableSearch from '../../../partials/TableSearch/TableSearch';
import DateFilter from '../../../partials/dateFilter/DateFilter';

class Supplier extends React.Component {

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
        this.asyncSupplier(1);
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

    asyncSupplier = async(pageNumber, perPage = 10, keyword = null) => {
        if(this._isMounted) {
            const dateRange = {
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd
            }
            this._isMounted && this.setState({loading: true});
            this.props.fetchSupplier(perPage, pageNumber, keyword, dateRange)
            .then(() => this._isMounted && this.setState({loading: false}))
            .catch(() => this._isMounted && this.setState({loading: false}))
        }
    }

    render() {

        let rows;
        const {supplier} = this.props;
        if(supplier.length > 0) {
            rows = supplier.map((data, i) => (
                <tr key={i}>
                    <td>{data.code}</td>
                    <td>{data.name}</td>
                    <td>{data.full_name}</td>
                    <td>{data.address}</td>
                    <td>
                        <ImageTable imgUrl={data.image} />
                    </td>
                    <td>{data.created_at}</td>
                    <td>{data.updated_at}</td>
                    <td>{data.updated_by}</td>
                    <td></td>
                </tr>
            ));
        } else {
            rows = (<RowEmpty colSpan='9'>Data not found</RowEmpty>);
        }

        const {optionPaginate} = this.props;

        const loading = (<RowLoading colSpan='9'>Loading</RowLoading>);

        return (
            <Aux>
                <Card className="animate animated bounceInRight">
                    <Card.Header as="h5">Supplier</Card.Header>
                    <Card.Body>
                        <DateFilter dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} handleChange={this.changeRangeDate} submit={this.asyncSupplier}/>
                        <TableSupplier>
                            {this.state.loading ? loading : rows}
                        </TableSupplier>
                    </Card.Body>
                </Card>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        optionPaginate: state.supplier.optionPaginate,
        supplier: state.supplier.supplier,
        response: state.supplier.response
    }
}

const dispatchToProps = dispatch => {
    return {
        fetchSupplier: (perPage, page, keyword, dateRange) => dispatch(fetchSupplier(perPage, page, keyword, dateRange))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Supplier);