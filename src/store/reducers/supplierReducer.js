import {
    SUCCESS_FETCH_SUPPLIER,
    FAIL_FETCH_SUPPLIER
} from '../constants/supplierConstant';

const initState = {
    currentId: null,
    showForm: false,
    optionPaginate: {},
    supplier:[],
    showSupplier: {},
    response: {}
}

const supplierReducer = (state = initState, action) => {
    switch(action.type) {
        case SUCCESS_FETCH_SUPPLIER:
            return {...state, optionPaginate: action.optionPaginate, supplier: action.supplier}
        case FAIL_FETCH_SUPPLIER:
            return {...state, response: action.response}
        default:
            return state;
    }
    
}

export default supplierReducer;