import http from '../utils/http.js';


const authService = {
  login(data) {
    const url = '/api/v1/login';
    return http.post(url, data);
  }
};


export default authService;
