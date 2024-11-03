import http from '../utils/http.js';


const carService = {
  fetchCars() {
    const url = '/api/v1/cars';
    return http.get(url);
  },
  addKMToCar(logId, car, nextMileageAM, prevMileageAM, nextMileagePM, prevMileagePM, mileageDate) {
    const url = `/api/v1/cars/kilometers/logs/${logId}/`;
    const payload = {
      car,
      mileage_am: nextMileageAM,
      prev_mileage_am: prevMileageAM,
      mileage_pm: nextMileagePM,
      prev_mileage_pm: prevMileagePM,
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
