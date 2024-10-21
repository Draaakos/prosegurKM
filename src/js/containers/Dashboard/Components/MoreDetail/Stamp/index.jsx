import { useContext } from 'react';
import { DashboardContext } from '../../../context.js';
import css from './index.css';

const Item = ({ name, backgroundColor }) => {
  return (
   <div className={css.stamps}>
      <div className={css.stamp} style={{ backgroundColor }}></div>
      <div>{name}</div>
   </div>
  );
};


const Stamp = () => {
  const { states, actions } = useContext(DashboardContext);
  console.log(states.carActive.stamps)

  return (
    <div>
      {states.carActive.stamps.map(item => <Item name={item.name} backgroundColor={item.color} />)}
    </div>
  )
};

export default Stamp;
