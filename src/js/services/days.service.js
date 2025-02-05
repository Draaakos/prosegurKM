import http from '../utils/http.js';


const daysService = {
  fetchDaysByDate(carId, year, month) {
    const url = `/api/v1/logs/${year}/${month}/car/${carId}`;
    return http.get(url);
  }
};


export default daysService;
