import { useContext, useRef, useState } from 'react';
import { DashboardContext } from '../../../context.js';
import service from '../../../../../services/car.service.js';
import css from './index.css';

const Item = ({ data }) => {
  const onDeleteItem = () => {
    service.deleteStampForCar({ 'car_stamp_id': data.car_stamp_id })
      .then(window.location.reload());
  };

  return (
    <div className={css.item}>
      <div className={css.stamps}>
        <div className={css.stamp} style={{ backgroundColor: data.color }}></div>
        <div className={css.name}>Sello: {data.name}</div>
        <div className={css.expired}>expira: {data.expired_date}</div>
        <div className={css.delete} onClick={onDeleteItem}>
          <img src={`/static/${VERSION}/images/generic/trash-solid.svg`} />
        </div>
      </div>
      <div>
        { data.is_expired && <img src={`/static/${VERSION}/images/generic/warning-triangle-solid.svg`} /> }
      </div>
    </div>

  );
};


const StampForm = ({ car, stampsActives }) => {
  const expiredDateRef = useRef(null);
  const stampIdRef = useRef(null);

  const stamps = [
    {
      id: 1,
      name: "Naranjo"
    },
    {
      id: 2,
      name: "Rojo"
    },
    {
      id: 3,
      name: "Azul"
    },
    {
      id: 4,
      name: "Amarillo"
    }
  ];

  const onSend = () => {
    const expiredDate = expiredDateRef.current.value.replaceAll('-', '/');
    const stampId = stampIdRef.current.value;

    const payload = {
      'car': car.id,
      'stamp': stampId,
      'expired_date': expiredDate
    }

    service.addStampForCar(payload)
      .then(window.location.reload())
  };

  const optionsAvailables = stamps
    .filter(item => !(stampsActives.filter(active => active.stamp_id == item.id)).length);

  return (
    <div className={css.stamp_form}>
      <div>
        <div>Sello</div>
        <select ref={stampIdRef}>
          { optionsAvailables.map((item, idx) => <option value={item.id} key={`option-${idx}`}>{item.name}</option>) }
        </select>
      </div>
      <div>
        <div>Fecha de expiracion</div>
        <div>
          <input ref={expiredDateRef} type="date" />
        </div>
      </div>

      <div onClick={onSend} className={css.stamp_btn_add}>Agregar</div>
    </div>
  );
};


const Stamp = () => {
  const [ isActiveNewStamp, setIsActiveNewStamp ] = useState(false);
  const { states } = useContext(DashboardContext);
  const items = states.carActive.stamps
    .map((item, idx) => <Item key={`item-${idx}`} data={item} />
  );

  return (
    <div>
      {items}

      <div onClick={() => { setIsActiveNewStamp(!isActiveNewStamp) }} className={css.stamp_add}>Agregar sello</div>
      { isActiveNewStamp && <StampForm car={states.carActive} stampsActives={states.carActive.stamps} /> }
    </div>
  )
};

export default Stamp;
