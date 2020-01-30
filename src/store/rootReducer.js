import {combineReducers} from 'redux';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import productTypeReducer from './reducers/productTypeReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';


const rootReducer = combineReducers({
    auth: authReducer,
    userMaster: userReducer,
    productTypes: productTypeReducer,
    toastr: toastrReducer
});

export default rootReducer;