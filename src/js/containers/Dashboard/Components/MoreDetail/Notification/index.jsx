import { useContext, useRef, useState } from 'react';
import { DashboardContext } from '../../../context.js';
import carService from '../../../../../services/car.service.js';
import css from './index.css';


const Notificacion = () => {
  const mileagePreventiveNotificationRef = useRef(null);
  const { states } = useContext(DashboardContext);
  const [ mileagePreventiveNotification, setMileagePreventiveNotification ] = useState(states.carActive.mileage_preventive_notification);

  const onChange = () => {
    setMileagePreventiveNotification(mileagePreventiveNotificationRef.current.value);
  };

  const onSave = () => {
    const payload = { ...states.carActive };
    payload.mileage_preventive_limit = payload.mileage_preventive_limit;
    payload.mileage_preventive_notification = mileagePreventiveNotification;
    carService.updateCar(payload)
      .then(() => window.location.reload());
  }

  // const

  return (
    <div>
      <div className={css.item}>
        <div>Notificacion kilometraje preventivo:</div>
        <div>
          <input ref={mileagePreventiveNotificationRef} type="text" onChange={onChange} defaultValue={mileagePreventiveNotification} />
        </div>
      </div>

      { states.carActive.mileage_preventive_notification != mileagePreventiveNotification ? <button onClick={onSave}>Actualizar</button> : null}
    </div>
  )
};

export default Notificacion;
