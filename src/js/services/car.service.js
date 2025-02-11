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
  addStampForCar(payload) {
    const url = `/api/v1/cars/stamp/`;
    return http.post(url, payload);
  },
  deleteStampForCar(payload) {
    const url = `/api/v1/cars/stamp/`;
    return http.delete(url, payload);
  },
  addCar(carData) {
    const url = '/api/v1/cars/';
    return http.post(url, carData);
  },
  fetchCarTypes() {
    const url = `/api/v1/car/types`;
    return http.get(url);
  },
  deleteCar(carId) {
    const url = `/api/v1/cars/${carId}/`;
    return http.delete(url);
  },
  generateDays(payload) {
    const url = `/api/v1/month/`;
    return http.post(url, payload);
  }
};


export default carService;
