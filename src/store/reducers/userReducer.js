import {SUCCESS_FETCH_USER, FAIL_FETCH_USER} from '../constants/userConstant';

const initState = {
    optionPaginate: {},
    users: [],
    response: {}
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_FETCH_USER:
            return {...state, optionPaginate: action.optionPaginate, users: action.users}
        case FAIL_FETCH_USER:
            return {...state, response: action.response}
        default:
            return state
    }
}

export default userReducer;