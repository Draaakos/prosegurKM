import http from '../utils/http.js';


const trainerService = {
  fetchTrainers() {
    const url = '/api/v1/person/trainer';
    return http.get(url);
  }
};


export default trainerService;
