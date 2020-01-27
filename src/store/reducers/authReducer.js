import {SUCCESS_LOGIN_ACTION, FAIL_LOGIN_ACTION, SUCCESS_LOGOUT_ACTION, FAIL_LOGOUT_ACTION} from '../constants/authConstant';
import {decrypt} from '../../config/generate';

const initState = {
    user: ((localStorage.getItem("token") !== null) && (localStorage.getItem("token"))) ? localStorage.getItem("token") : null,
    isAdmin: ( (localStorage.getItem("isAdmin") !== null) && decrypt((localStorage.getItem("isAdmin"))) ) ? decrypt(localStorage.getItem("isAdmin")) : 'NO'
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN_ACTION:
            return {...state, user: action.token, isAdmin: action.isAdmin}
        case FAIL_LOGIN_ACTION:
            return initState
        case SUCCESS_LOGOUT_ACTION:
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            return {...state, user: null, isAdmin: false}
        case FAIL_LOGOUT_ACTION:
            return state
        default:
            return state
    }
}

export default authReducer;