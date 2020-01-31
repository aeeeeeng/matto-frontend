import {
    SUCCESS_FETCH_UOM, FAIL_FETCH_UOM,
    SUCCESS_SAVE_UOM, FAIL_SAVE_UOM,
    SHOW_EDIT_PAGE, END_EDIT_PAGE,
    SHOW_ADD_PAGE, END_ADD_PAGE,
    SUCCESS_SHOW_UOM, FAIL_SHOW_UOM,
    SUCCESS_UPDATE_UOM, FAIL_UPDATE_UOM,
    SUCCESS_DELETE_UOM, FAIL_DELETE_UOM
} from '../constants/uomConstant';

import axios from 'axios';

export const showAddPage = () => dispatch => dispatch({type: SHOW_ADD_PAGE});

export const endAddPage = () => dispatch => dispatch({type: END_ADD_PAGE});

export const showEditPage = (id) => dispatch => dispatch({type: SHOW_EDIT_PAGE, currentId: id});

export const endEditPage = () => dispatch => dispatch({type: END_EDIT_PAGE});

export const deleteUom = (id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/uom/${id}`)
            .then(res => {
                resolve(res);
                const response = res.data;
                dispatch({
                    type: SUCCESS_DELETE_UOM,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_DELETE_UOM, response: response})
            })
        })
    }
}

export const updateUom = (payload, id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/uom/save/${id}`, payload)
            .then(res => {
                resolve(res);
                const response = res.data;
                dispatch({
                    type: SUCCESS_UPDATE_UOM,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_UPDATE_UOM, response: response})
            })
        })
    }
}

export const showUom = (id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`/api/uom/${id}`)
            .then(res => {
                resolve(res)
                const response = res.data;
                dispatch({
                    type: SUCCESS_SHOW_UOM,
                    showUom: response.data,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_SHOW_UOM, response: response})
            })
        })   
    }
}

export const saveUom = (payload) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post('/api/uom/save', payload)
            .then(res => {
                resolve(res);
                const response = res.data;
                dispatch({
                    type: SUCCESS_SAVE_UOM,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_SAVE_UOM, response: response})
            })
        })
    }
}

export const fetchUom = (perPage, page, keyword, dateRange = null) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const params = {perPage, page, keyword}
            if(dateRange) {
                if(typeof dateRange.dateStart !== 'undefined') {
                    params.dateStart = dateRange.dateStart;
                } 
                if(typeof dateRange.dateEnd !== 'undefined') {
                    params.dateEnd = dateRange.dateEnd;
                }
            }
            axios.get('/api/uom', {params})
            .then(res => {
                resolve(res);
                const response = res.data;
                let optionPaginate = {};
                optionPaginate.current_page = response.data.current_page;
                optionPaginate.from = response.data.from;
                optionPaginate.last_page = response.data.last_page;
                optionPaginate.per_page = response.data.per_page;
                optionPaginate.prev_page_url = response.data.prev_page_url;
                optionPaginate.to = response.data.to;
                optionPaginate.total = response.data.total;
                dispatch({
                    type: SUCCESS_FETCH_UOM, 
                    uom: response.data.data, 
                    optionPaginate: optionPaginate,
                    response: response.message
                });
            })
            .catch(error => {
                const response = typeof(error.response !== 'object') ? {} : error.response;
                reject(response);
                dispatch({type: FAIL_FETCH_UOM, response: response})
            })
        })
    }
}