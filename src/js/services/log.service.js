import http from '../utils/http.js';


const logService = {
  fetchLogs() {
    const url = '/api/v1/logs';
    return http.get(url);
  }
};


export default logService;
