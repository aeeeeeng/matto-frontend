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
            dispatch({ type: SUCCESS_LOGIN_ACTION, token: response.token });
        } else {
            dispatch({type: FAIL_LOGIN_ACTION});
        }
    }
}