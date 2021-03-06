import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import FullScreen from './Modules/FullScreen';
import SidebarScreen from './Modules/SidebarScreen';
import Login from './Auth/Login/Login';
import Aux from '../hoc/Aux';
// import classes from './Admin.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class Admin extends React.Component {
    render() {
        return (
            <Aux>
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route exact path="/login" name="Login Page" label="Login Page" render={props => <Login {...props}/>} />
                        <Route path="/" name="Home" render={props => <SidebarScreen {...props}/>}></Route>
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
            {/* <FullScreen/> */}
            </Aux>
        )
    }
}

export default Admin;