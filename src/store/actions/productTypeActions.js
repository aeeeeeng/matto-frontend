import axios from 'axios';
import {SUCCESS_FETCH_PRODUCT_TYPES, FAIL_FETCH_PRODUCT_TYPES, 
       SUCCESS_SAVE_PRODUCT_TYPES, FAIL_SAVE_PRODUCT_TYPES,
       SHOW_ADD_PAGE, END_ADD_PAGE,
       SHOW_EDIT_PAGE, END_EDIT_PAGE,
       SUCCESS_SHOW_PRODUCT_TYPE, FAIL_SHOW_PRODUCT_TYPE,
       SUCCESS_UPDATE_PRODUCT_TYPE, FAIL_UPDATE_PRODUCT_TYPE,
       SUCCESS_DELETE_PRODUCT_TYPE, FAIL_DELETE_PRODUCT_TYPE} from '../constants/productTypeConstant';


export const deleteProductType = (id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/product-types/${id}`)
            .then(res => {
                resolve(res);
                const response = res.data;
                dispatch({
                    type: SUCCESS_DELETE_PRODUCT_TYPE,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_DELETE_PRODUCT_TYPE, response: response})
            })
        })
    }
}

export const updateProductTypes = (payload, id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/product-types/save/${id}`, payload)
            .then(res => {
                resolve(res);
                const response = res.data;
                dispatch({
                    type: SUCCESS_UPDATE_PRODUCT_TYPE,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_UPDATE_PRODUCT_TYPE, response: response})
            })
        })
    }
}

export const showProductType = (id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`/api/product-types/${id}`)
            .then(res => {
                resolve(res)
                const response = res.data;
                dispatch({
                    type: SUCCESS_SHOW_PRODUCT_TYPE,
                    showProduct: response.data,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_SHOW_PRODUCT_TYPE, response: response})
            })
        })
    }
}

export const showAddPage = () => {
    return dispatch => dispatch({type: SHOW_ADD_PAGE});
}

export const endAddPage = () => {
    return dispatch => dispatch({type: END_ADD_PAGE});
}

export const showEditPage = (id) => {
    return dispatch => dispatch({type: SHOW_EDIT_PAGE, currentId: id});
}

export const endEditPage = () => {
    return dispatch => dispatch({type: END_EDIT_PAGE});
}

export const saveProductTypes = (payload) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post('/api/product-types/save', payload)
            .then(res => {
                resolve(res);
                const response = res.data;
                dispatch({
                    type: SUCCESS_SAVE_PRODUCT_TYPES,
                    response: response
                })
            })
            .catch(error => {
                reject(error.response);
                const response = (typeof error.response !== 'object') ? {} : error.response;
                dispatch({type: FAIL_SAVE_PRODUCT_TYPES, response: response})
            })
        })
    }
}

export const fetchProductTypes = (perPage, page, keyword, dateRange = null) => {
    return dispatch => {
        return new Promise((resolve, reject)=> { 
            const params = {perPage, page, keyword}
            if(dateRange) {
                if(typeof dateRange.dateStart !== 'undefined') {
                    params.dateStart = dateRange.dateStart;
                } 
                if(typeof dateRange.dateEnd !== 'undefined') {
                    params.dateEnd = dateRange.dateEnd;
                }
            }
            axios.get('/api/product-types', {params})
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
                    type: SUCCESS_FETCH_PRODUCT_TYPES, 
                    productTypes: response.data.data, 
                    optionPaginate: optionPaginate,
                    response: response.message
                });
            })
            .catch(error => {
                const response = typeof(error.response !== 'object') ? {} : error.response;
                reject(response);
                dispatch({type: FAIL_FETCH_PRODUCT_TYPES, response: response})
            })
        });
    }
}