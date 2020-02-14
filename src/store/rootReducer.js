import {combineReducers} from 'redux';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import productTypeReducer from './reducers/productTypeReducer';
import uomReducer from './reducers/uomReducer';
import supplierReducer from './reducers/supplierReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';


const rootReducer = combineReducers({
    auth: authReducer,
    userMaster: userReducer,
    productTypes: productTypeReducer,
    uom: uomReducer,
    toastr: toastrReducer,
    supplier: supplierReducer
});

export default rootReducer;