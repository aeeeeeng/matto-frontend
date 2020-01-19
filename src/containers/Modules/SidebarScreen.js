import React, {Suspense} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import Aux from '../../hoc/Aux';
import Layout from '../../hoc/Layout/Layout';
import Sidebar from '../../components/sidebar/Sidebar';
import MainPannel from '../../components/main-pannel/MainPannel';
import NavbarAdmin from '../../components/header/navbar/NavbarAdmin';

import routes from '../../config/routes';

class SidebarScreen extends React.Component {
    state = {
        contents: routes
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>



    render() {
        return (
            <Aux>
                <Layout>
                    <Router>
                        <Suspense>
                            <Sidebar/>
                        </Suspense>
                        <MainPannel>
                            <NavbarAdmin/>
                            <Container>
                                <Suspense fallback={this.loading()}>
                                    <Switch>
                                        <Route exact path="/"></Route>
                                        {
                                            this.state.contents.map((content, i) => {
                                                return content.component ? (
                                                    <Route 
                                                        key={i} 
                                                        path={content.link} 
                                                        name={content.name} 
                                                        render={props => (<content.component {...props} />)}>
                                                    </Route>
                                                ) : (null)
                                            })
                                        }
                                        <Redirect from="/" to="/dashboard" />
                                    </Switch>
                                </Suspense>
                            </Container>
                        </MainPannel>
                    </Router>
                </Layout>
            </Aux>
        )
    }
}

export default SidebarScreen;

