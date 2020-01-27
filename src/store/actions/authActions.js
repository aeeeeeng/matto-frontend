import axios from 'axios';
import {SUCCESS_LOGIN_ACTION, FAIL_LOGIN_ACTION, FAIL_LOGOUT_ACTION, SUCCESS_LOGOUT_ACTION} from '../constants/authConstant';

export const loginAction = (payload) => {
    return dispatch => {
        return axios.post('/api/login', payload)
    }
}

export const loginResponse = (response) => {
    return dispatch => {
        if(response.type) {
            dispatch({ type: SUCCESS_LOGIN_ACTION, token: response.authorization, isAdmin: response.keyIsAdmin });
        } else {
            dispatch({type: FAIL_LOGIN_ACTION});
        }
    }
}

export const logoutAction = (payload = {}) => {
    return dispatch => {
        return axios.post('/api/logout', payload)
    }
}

export const logoutResponse = response => {
    return dispatch => {
        if(response.type) {
            dispatch({type: SUCCESS_LOGOUT_ACTION});
        } else {
            dispatch({type: FAIL_LOGOUT_ACTION});
        }
    }
}