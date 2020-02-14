import {
    SUCCESS_FETCH_SUPPLIER, 
    FAIL_FETCH_SUPPLIER
} from '../constants/supplierConstant';

import axios from 'axios';

export const fetchSupplier = (perPage, page, keyword, dateRange = null) => {
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
            axios.get('/api/supplier', {params})
            .then(res => {
                resolve(res);
                const response = res.data;
                let optionPaginate = {}
                optionPaginate.current_page = response.data.current_page;
                optionPaginate.from = response.data.from;
                optionPaginate.last_page = response.data.last_page;
                optionPaginate.per_page = response.data.per_page;
                optionPaginate.prev_page_url = response.data.prev_page_url;
                optionPaginate.to = response.data.to;
                optionPaginate.total = response.data.total;
                dispatch({
                    type: SUCCESS_FETCH_SUPPLIER,
                    supplier: response.data.data,
                    optionPaginate: optionPaginate,
                    response: response.message
                });
            })
            .catch(error => {
                const response = typeof(error.response !== 'object') ? {} : error.response;
                reject(response);
                dispatch({type: FAIL_FETCH_SUPPLIER, response: response})
            })
        })
    }
}
