import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
// import FullScreen from './Modules/FullScreen';
import SidebarScreen from './Modules/SidebarScreen';
import Login from './Auth/Login/Login';
import Aux from '../hoc/Aux';
import {userIsNotAuthenticatedRedir, userIsAdminRedir} from '../config/auth';
// import classes from './Admin.css';

const AdminHome = userIsAdminRedir(SidebarScreen);
const Guest = userIsNotAuthenticatedRedir(Login);

const loading = () => (<div className="animate animated fadeIn pt-3 text-center">Please Wait</div>)

class Admin extends React.Component {
    render() {
        return (
            <Aux>
                <BrowserRouter>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route exact path="/login" name="Login Page" label="Login Page" render={props => <Guest {...props}/>} />
                            <Route path="/" name="Home" render={props => <AdminHome {...props}/>}></Route>
                        </Switch>
                    </React.Suspense>
                </BrowserRouter>
                {/* <FullScreen/> */}
            </Aux>
        )
    }
}

export default Admin;