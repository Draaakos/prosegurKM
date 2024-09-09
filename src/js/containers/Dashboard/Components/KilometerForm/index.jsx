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
    <div className={css.content_form}>
      <div>
        <div>{car.ppu}</div>
        <input ref={kilometerRef} type="number" placeholder='200' />
        <button onClick={onSubmit}>Agregar Kilometraje</button>
      </div>
    </div>
  )
};

export default KilometerForm;
