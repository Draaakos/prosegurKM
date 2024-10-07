import { useEffect, useState } from "react";
import carService from './../../services/car.service.js';

const useDashboard = () => {
  const [ cars, setCars ] = useState([]);
  const [ carActive, setCarActive ] = useState(1);
  const [ dayActive, setDayActive ] = useState(null);
  const [ mileageModalActive, setMileageModalActive ] = useState(false);
  const [ serviceOptions, setServiceOptions ] = useState([]);


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

    carService.fetchServiceSelector()
      .then(response => setServiceOptions(response.services));
  }, []);

  return {
    states: {
      cars,
      carActive,
      mileageModalActive,
      dayActive,
      serviceOptions
    },
    actions: {
      ...actions,
      setMileageModalActive
    }
  }
};


export default useDashboard;
