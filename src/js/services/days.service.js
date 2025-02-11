import http from '../utils/http.js';


const daysService = {
  fetchDaysByDate(payload ) {
    const url = `/api/v1/logs/${payload.year}/${payload.month}/car/${payload.car}`;
    return http.get(url);
  }
};


export default daysService;
