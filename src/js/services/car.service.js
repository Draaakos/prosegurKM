import http from '../utils/http.js';


const carService = {
  fetchCars() {
    const url = '/api/v1/cars';
    return http.get(url);
  },
  addKMToCar(logId, car, prevMileage, nextMileage, mileageDate) {
    const url = `/api/v1/cars/kilometers/logs/${logId}/`;
    const payload = {
      car,
      next_mileage: nextMileage,
      prev_mileage: prevMileage,
      mileage_date: mileageDate
    };

    return http.put(url, payload);
  },
  updateCar(car) {
    const url = `/api/v1/cars/${car.id}/`;
    return http.put(url, car)
  },
  fetchServiceSelector() {
    const url = `/api/v1/cars/filter/services`;
    return http.get(url);
  },
};


export default carService;
