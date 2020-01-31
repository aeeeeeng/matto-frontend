import {
    SUCCESS_FETCH_UOM, FAIL_FETCH_UOM,
    SUCCESS_SAVE_UOM, FAIL_SAVE_UOM,
    SHOW_EDIT_PAGE, END_EDIT_PAGE,
    SHOW_ADD_PAGE, END_ADD_PAGE,
    SUCCESS_SHOW_UOM, FAIL_SHOW_UOM,
    SUCCESS_UPDATE_UOM, FAIL_UPDATE_UOM,
    SUCCESS_DELETE_UOM, FAIL_DELETE_UOM
} from '../constants/uomConstant';

const initState = {
    currentId: null,
    showForm: false,
    optionPaginate: {},
    uom: [],
    showUom: {},
    response: {}
}

const uomReducer = (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_FETCH_UOM:
            return {...state, optionPaginate: action.optionPaginate, uom: action.uom}
        case FAIL_FETCH_UOM:
            return {...state, response: action.response}
        case SHOW_ADD_PAGE:
            return {...state, showForm: true}
        case END_ADD_PAGE:
            return {...state, showForm: false, currentId: null}
        case SHOW_EDIT_PAGE:
            return {...state, showForm: true, currentId: action.currentId}
        case END_EDIT_PAGE:
            return {...state, showForm: false, currentId: null}
        case SUCCESS_SAVE_UOM:
            return {...state, response: action.response}
        case FAIL_SAVE_UOM:
            return {...state, response: action.response}
        case SUCCESS_SHOW_UOM:
            return {...state, showUom: action.showUom, response: action.response}
        case FAIL_SHOW_UOM:
            return {...state, response: action.response}
        case SUCCESS_UPDATE_UOM:
            return {...state, response: action.response}
        case FAIL_UPDATE_UOM:
            return {...state, response: action.response}
        case SUCCESS_DELETE_UOM:
            return {...state, response: action.response}
        case FAIL_DELETE_UOM:
            return {...state, response: action.response}
        default:
            return state;
    }
}

export default uomReducer;