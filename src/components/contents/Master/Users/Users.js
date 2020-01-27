import React from 'react';
import {Card} from 'react-bootstrap';
import Aux from '../../../../hoc/Aux';
import 'animate.css';
import {connect} from 'react-redux'
import {fetchUser} from '../../../../store/actions/userActions';
import TableUser from './subComponent/TableUser';
import Paginations from '../../../partials/paginations/Paginations';
import TableSearch from '../../../partials/TableSearch/TableSearch';

class Users extends React.Component {

    state = {
        loading: false,
        lengthPage: [10, 20, 50, 100, 200]
    }

    componentDidMount() {
        this.asyncUser(1);
    }

    changeLengthPage = (e) => {
        const length = e.target.value;
        this.asyncUser(1, length);
    }

    asyncUser = async (pageNumber, perPage = 10, keyword = null) => {
        this.props.fetchUser(perPage, pageNumber, keyword)
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
        }

        const {optionPaginate} = this.props;
        
        return(
            <Aux>
                <Card className="animate bounceIn">
                    <Card.Header as="h5">User Data List</Card.Header>
                    <Card.Body>
                        <TableSearch optionPaginate={optionPaginate} lengthPage={this.state.lengthPage} change={this.asyncUser}/>
                        <TableUser> 
                            {rows} 
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
        fetchUser: (perPage, page, keyword) => dispatch(fetchUser(perPage, page, keyword))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Users);