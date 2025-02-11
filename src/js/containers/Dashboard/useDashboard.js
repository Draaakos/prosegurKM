import { useEffect, useState } from "react";
import carService from './../../services/car.service.js';

const useDashboard = () => {
  const [ filterCars, setFilterCars ] = useState([]);
  const [ cars, setCars ] = useState([]);
  const [ carActive, setCarActive ] = useState(1);
  const [ dayActive, setDayActive ] = useState(null);
  const [ mileageModalActive, setMileageModalActive ] = useState(false);
  const [ isMoreDetailsModalActive, setIsMoreDetailsModalActive ] = useState(false);
  const [ serviceOptions, setServiceOptions ] = useState([]);


  const actions = {
    onSelectCar: (car, day) => {
      setCarActive(car);
      setMileageModalActive(true);
      setDayActive(day);
    },
    onActiveDetails: (car) => {
      setCarActive(car);
      setIsMoreDetailsModalActive(true);
    },
    onFilter: (inputText) => {
      const words = inputText.trim().split(/\s+/);
      const regex = new RegExp(words.map(word => `(?=.*${word})`).join(''), 'i');
      const list = cars.filter(item => regex.test(item.ppu));
      setFilterCars(list);
    }
  };

  useEffect(() => {
    carService.fetchCars()
      .then(response => {
        setCars(response);
        setFilterCars(response);
      });

    carService.fetchServiceSelector()
      .then(response => {
        setServiceOptions(response.services);
      });
  }, []);

  return {
    states: {
      cars,
      carActive,
      mileageModalActive,
      dayActive,
      serviceOptions,
      isMoreDetailsModalActive,
      filterCars
    },
    actions: {
      ...actions,
      setMileageModalActive,
      setIsMoreDetailsModalActive
    }
  }
};


export default useDashboard;
