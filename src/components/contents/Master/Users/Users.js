import React from 'react';
import {Card} from 'react-bootstrap';
import Aux from '../../../../hoc/Aux';
import 'animate.css';
import {connect} from 'react-redux'
import {fetchUser} from '../../../../store/actions/userActions';
import TableUser from './subComponent/TableUser';
import Paginations from '../../../partials/paginations/Paginations';
import TableSearch from '../../../partials/TableSearch/TableSearch';
import DateFilter from '../../../partials/dateFilter/DateFilter';
import {RowEmpty, RowLoading} from '../../../partials/tableOptions/TableOptions'
import moment from 'moment';

class Users extends React.Component {

    state = {
        loading: false,
        lengthPage: [10, 20, 50, 100, 200],
        dateStart: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD')
    }

    componentDidMount() {
        this.asyncUser(1);
    }

    changeRangeDate = (date, type) => {
        let dateStart, dateEnd;
        if(type === 'dateStart') {
            dateStart = moment(date).format('YYYY-MM-DD');
            this.setState({dateStart});
        } else if (type === 'dateEnd') {
            dateEnd = moment(date).format('YYYY-MM-DD');
            this.setState({dateEnd});
        }
    }

    changeLengthPage = (e) => {
        const length = e.target.value;
        this.asyncUser(1, length);
    }

    asyncUser = async (pageNumber, perPage = 10, keyword = null) => {
        const dateRange = {
            dateStart : this.state.dateStart,
            dateEnd : this.state.dateEnd
        }
        this.setState({loading: true})
        this.props.fetchUser(perPage, pageNumber, keyword, dateRange)
        .then(() => this.setState({loading: false}))
        .catch(()=> this.setState({loading: false}));
    }

    render() {
        let rows;
        const {users} = this.props;
        if (users.length > 0) {
            rows = users.map((user, i) => (
                <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role_name}</td>
                    <td>{user.created_at}</td>
                </tr>
            ));
        } else {
            rows = (<RowEmpty colSpan='4'>Data not found</RowEmpty>);
        }

        const {optionPaginate} = this.props;

        const loading = (<RowLoading colSpan='4'>Loading</RowLoading>);
        
        return(
            <Aux>
                <Card className="animate bounceIn">
                    <Card.Header as="h5">User Data List</Card.Header>
                    <Card.Body>
                        <DateFilter dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} handleChange={this.changeRangeDate} submit={this.asyncUser}/>
                        <TableSearch optionPaginate={optionPaginate} lengthPage={this.state.lengthPage} change={this.asyncUser}/>
                        <TableUser>
                            {this.state.loading ? loading : rows}
                        </TableUser>
                        <Paginations optionPaginate={optionPaginate} fetch={this.asyncUser}/>
                    </Card.Body>
                </Card>
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        optionPaginate: state.userMaster.optionPaginate,
        users: state.userMaster.users,
        userResponse: state.userMaster.userResponse
    }
}

const dispatchToProps = dispatch => {
    return {
        fetchUser: (perPage, page, keyword, dateRange) => dispatch(fetchUser(perPage, page, keyword, dateRange))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Users);