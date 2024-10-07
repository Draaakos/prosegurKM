import { useRef } from 'react';
import service from '../../../../services/car.service.js';
import { formatMilesSeparator } from 'utils/number';
import css from './index.css';


const KilometerForm = ({ car, day }) => {
  const kilometerRef = useRef(null);

  const onSubmit = () => {
    const mileage = kilometerRef.current.value;

    if(mileage <= car.mileage) {
      alert('No puede ser menor que el kilometraje actual');
      return;
    }

    const carId = car.id;
    const logId = day.id;
    const kmDate = day.date;

    const newCar = { ...car };
    newCar.mileage = mileage;

    const prevMileage = car.mileage;
    const nextMileage = mileage;

    service.addKMToCar(logId, carId, prevMileage, nextMileage, kmDate)
      .then(response => console.log(response));

    service.updateCar(newCar)
      .then(response => console.log(response));
  }


  return (
    <div className={css.content}>
      <div className={css.content__form}>
        <div className={css.content__title}>{car.ppu}</div>
        <div className={css.content__input}>Kilometraje actual: {formatMilesSeparator(car.mileage)} KM</div>
        <div className={css.content__input}><input min={car.mileage} ref={kilometerRef} defaultValue={car.mileage} type="number" placeholder='200' /></div>
        <div className={css.content__button} onClick={onSubmit}>Kilometraje Nuevo</div>
      </div>
    </div>
  )
};

export default KilometerForm;
