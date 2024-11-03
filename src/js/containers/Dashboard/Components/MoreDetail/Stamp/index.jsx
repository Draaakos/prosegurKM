import { useContext, useState } from 'react';
import { DashboardContext } from '../../../context.js';
import css from './index.css';

const Item = ({ data }) => {
  return (
   <div className={css.stamps}>
      <div className={css.stamp} style={{ backgroundColor: data.color }}></div>
      <div>Sello: {data.name}</div>
      <div className={css.expired}>expira: {data.expired_date}</div>
      <div className={css.delete}>
        <img src={`/static/${VERSION}/images/generic/trash-solid.svg`} />
      </div>
   </div>
  );
};


const StampForm = ({ stampsActives }) => {
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
    }
  ];

  const optionsAvailables = stamps
    .filter(item => !(stampsActives.filter(active => active.stamp_id == item.id)).length);

  return (
    <div className={css.stamp_form}>
      <div>
        <div>Sello</div>
        <select>
          { optionsAvailables.map((item, idx) => <option key={`option-${idx}`}>{item.name}</option>) }
        </select>
      </div>
      <div>
        <div>Fecha de expiracion</div>
        <div>
          <input type="text" />
        </div>
      </div>

      <div className={css.stamp_btn_add}>Agregar</div>
    </div>
  );
};


const Stamp = () => {
  const [ isActiveNewStamp, setIsActiveNewStamp ] = useState(false);
  const { states, actions } = useContext(DashboardContext);
  console.log('active', states.carActive.stamps);

  return (
    <div>
      {states.carActive.stamps.map((item, idx) => <Item key={`item-${idx}`} data={item} />)}

      <div onClick={() => { setIsActiveNewStamp(!isActiveNewStamp) }} className={css.stamp_add}>Agregar sello</div>
      { isActiveNewStamp && <StampForm stampsActives={states.carActive.stamps} /> }
    </div>
  )
};

export default Stamp;
