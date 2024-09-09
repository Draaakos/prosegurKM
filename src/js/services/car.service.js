import http from '../utils/http.js';


const carService = {
  fetchCars() {
    const url = '/api/v1/cars';
    return http.get(url);
  },
  addKMToCar(logId, car, mileage, mileageDate) {
    const url = `/api/v1/cars/kilometers/logs/${logId}/`;
    const payload = {
      car,
      mileage,
      mileage_date: mileageDate
    };

    return http.put(url, payload);
  }
};


export default carService;
