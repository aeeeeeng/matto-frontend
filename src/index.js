import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Admin from './containers/Admin';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import rootReducer from './store/rootReducer';

const store = createStore(rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <Admin />
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr}
            transitionIn="bounceInDown"
            transitionOut="bounceOutUp"
            progressBar
            closeOnToastrClick/>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
