import {combineReducers} from 'redux';

import authReducer from './reducers/authReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';


const rootReducer = combineReducers({
    auth: authReducer,
    toastr: toastrReducer
});

export default rootReducer;