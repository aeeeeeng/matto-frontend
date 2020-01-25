import axios from 'axios';

export default function refreshAuth() {
    return ({ dispatch, getState }) => next => (action) => {
      const {request} = action;
  
      if (!request) {
        return next(action);
      }
  
      const tokens = localStorage.getItem('token');
      
      if((tokens !== null) && (tokens !== undefined)) {
        axios.get('/api/refresh').then(resp => null).catch(error => {
            if(error.response.status === 401) {
                localStorage.removeItem('token')
                dispatch({type: 'SUCCESS_LOGOUT_ACTION'})
            }
        });
      }
      return request(tokens);
    };
  }