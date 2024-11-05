import { useRef } from 'react';
import service from '../../../../services/car.service.js';
import { formatMilesSeparator } from 'utils/number';
import css from './index.css';


const KilometerForm = ({ car, day }) => {
  const kilometerAMRef = useRef(null);
  const kilometerPMRef = useRef(null);

  const carId = car.id;
  const logId = day.id;
  const kmDate = day.date;

  const onSubmit = () => {
    const mileageAM = kilometerAMRef.current.value;
    const mileagePM = kilometerPMRef.current.value;
    const carMileage = car.mileage;

    if(mileagePM == 0) {
      if(mileageAM <= car.mileage) {
        alert('No puede ser menor que el kilometraje actual');
        return;
      }

      const newCar = { ...car };
      newCar.mileage = mileageAM;

      service.addKMToCar(logId, carId, mileageAM, carMileage, 0, 0, kmDate)
        .then(response => console.log(response));

      service.updateCar(newCar)
        .then(response => console.log(response));

    } else {
      if(mileagePM < car.mileage) {
        alert('No puede ser menor que el kilometraje actual');
        return;
      }

      const newCar = { ...car };
      newCar.mileage = mileagePM;


      service.addKMToCar(logId, carId, day.mileage_am, day.prev_mileage_am, mileagePM, mileageAM, kmDate)
        .then(response => console.log(response));

      service.updateCar(newCar)
        .then(response => console.log(response));
    }
  }



  return (
    <div className={css.content}>
      <div className={css.content__form}>
        <div className={css.content__title}>{car.ppu}</div>
        <div className={css.content__input}>Kilometraje actual: {formatMilesSeparator(car.mileage)} KM</div>
        <div className={css.content__input}>(05:00 - 16:59) Hrs <input min={car.mileage} ref={kilometerAMRef} defaultValue={day.mileage_pm > 0 ? day.mileage_am : car.mileage} type="number" placeholder='200' /></div>
        <div className={css.content__input}>(17:00 - 04:59) Hrs <input min={car.mileage_am} ref={kilometerPMRef} defaultValue={day.mileage_pm} type="number" placeholder='200' /></div>
        <div className={css.content__button} onClick={onSubmit}>Kilometraje Nuevo</div>
      </div>
    </div>
  )
};

export default KilometerForm;


// SI SE EDITA EL PRIMERO SE BORRA EL SEGUNDO
// SI SE EDITA EL SEGUNDO NO PASA NADA
// SOLO SE PUEDE EDITAR SI NO HAY UN KILOMETRAJE NUEVO AGREGADO AL SIGUIENTE DIA
