import {SUCCESS_LOGIN_ACTION, FAIL_LOGIN_ACTION, SUCCESS_LOGOUT_ACTION, FAIL_LOGOUT_ACTION} from '../constants/authConstant';

const initState = {
    user: ((localStorage.getItem("default_auth_token") !== null) && (localStorage.getItem("default_auth_token"))) ? localStorage.getItem("default_auth_token") : null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN_ACTION:
            return {...state, user: action.token}
        case FAIL_LOGIN_ACTION:
            return initState
        case SUCCESS_LOGOUT_ACTION:
            return {...state, user: null}
        case FAIL_LOGOUT_ACTION:
            return state
        default:
            return state
    }
}

export default authReducer;