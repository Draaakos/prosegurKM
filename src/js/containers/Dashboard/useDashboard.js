import { useEffect, useState } from "react";
import carService from './../../services/car.service.js';

const useDashboard = () => {
  const [ cars, setCars ] = useState([]);
  const [ carActive, setCarActive ] = useState(1);
  const [ dayActive, setDayActive ] = useState(null);
  const [ mileageModalActive, setMileageModalActive ] = useState(false);


  const actions = {
    onSelectCar: (car, day) => {
      setCarActive(car);
      setMileageModalActive(true);
      setDayActive(day)
    }
  };

  useEffect(() => {
    carService.fetchCars()
      .then(response => setCars(response));

    // trainerService.fetchTrainers()
    //   .then(response => setTrainers(response?.trainers));
  }, []);

  return {
    states: {
      cars,
      carActive,
      mileageModalActive,
      dayActive
    },
    actions: {
      ...actions,
      setMileageModalActive
    }
  }
};


export default useDashboard;
