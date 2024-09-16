import { useRef } from 'react';
import service from '../../../../services/car.service.js';
import css from './index.css';

const KilometerForm = ({ car, day }) => {
  const kilometerRef = useRef(null);

  const onSubmit = () => {
    const mileage = kilometerRef.current.value;
    const carId = car.id;
    const logId = day.id;
    const date = day.date;

    service.addKMToCar(logId, carId, mileage, date)
      .then(response => console.log(response))
  }

  return (
    <div className={css.content}>
      <div className={css.content__form}>
        <div className={css.content__title}>{car.ppu}</div>
        <div className={css.content__input}><input min="0" ref={kilometerRef} type="number" placeholder='200' /></div>
        <div className={css.content__button} onClick={onSubmit}>Agregar Kilometraje</div>
      </div>
    </div>
  )
};

export default KilometerForm;
