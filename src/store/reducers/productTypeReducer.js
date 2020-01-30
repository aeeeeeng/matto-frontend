import {SUCCESS_FETCH_PRODUCT_TYPES, FAIL_FETCH_PRODUCT_TYPES, 
        SUCCESS_SAVE_PRODUCT_TYPES, FAIL_SAVE_PRODUCT_TYPES,
        SHOW_ADD_PAGE, END_ADD_PAGE,
        SHOW_EDIT_PAGE, END_EDIT_PAGE, 
        SUCCESS_SHOW_PRODUCT_TYPE, FAIL_SHOW_PRODUCT_TYPE,
        SUCCESS_UPDATE_PRODUCT_TYPE, FAIL_UPDATE_PRODUCT_TYPE,
        SUCCESS_DELETE_PRODUCT_TYPE, FAIL_DELETE_PRODUCT_TYPE} from '../constants/productTypeConstant';

const initState = {
    currentId: null,
    showForm: false,
    optionPaginate: {},
    productTypes: [],
    showProductType: {},
    response: {}
}

const productTypeReducer = (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_FETCH_PRODUCT_TYPES:
            return {...state, optionPaginate: action.optionPaginate, productTypes: action.productTypes}
        case FAIL_FETCH_PRODUCT_TYPES:
            return {...state, response: action.response}
        case SUCCESS_SAVE_PRODUCT_TYPES:
            return {...state, response: action.response}
        case FAIL_SAVE_PRODUCT_TYPES:
            return {...state, response: action.response}
        case SHOW_ADD_PAGE:
            return {...state, showForm: true}
        case END_ADD_PAGE:
            return {...state, showForm: false, currentId: null}
        case SHOW_EDIT_PAGE:
            return {...state, showForm: true, currentId: action.currentId}
        case END_EDIT_PAGE:
            return {...state, showForm: false, currentId: null}
        case SUCCESS_SHOW_PRODUCT_TYPE:
            return {...state, showProduct: action.showProduct, response: action.response}
        case FAIL_SHOW_PRODUCT_TYPE:
            return {...state, response: action.response}
        case SUCCESS_UPDATE_PRODUCT_TYPE:
            return {...state, response: action.response}
        case FAIL_UPDATE_PRODUCT_TYPE:
            return {...state, response: action.response}
        case SUCCESS_DELETE_PRODUCT_TYPE:
            return {...state, response: action.response}
        case FAIL_DELETE_PRODUCT_TYPE:
            return {...state, response: action.response}
        default:
            return state;
    }
}

export default productTypeReducer;