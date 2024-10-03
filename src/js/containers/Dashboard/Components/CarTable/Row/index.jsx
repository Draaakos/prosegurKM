import { useState } from 'react';
import { formatMilesSeparator } from 'utils/number';
import css from './index.css';


const InformationEditableInput = ({ text }) => {
  const [ isActive, setIsActive ] = useState(false);
  const item = isActive ? <input type="text" /> : <div>{text}</div>

  return <div className={css.editable} onClick={() => setIsActive(true)}>{item}</div>;
};


const Row = ({ car }) => {
  const kmRest = formatMilesSeparator(150000 - car.mileage);

  return (
    <div className={css.row}>
      <div>{car.ppu}</div>
      <div>{car.type}</div>
      <div>{formatMilesSeparator(car.mileage)} KM</div>
      <div><InformationEditableInput text={car.mileage_preventive} /></div>
      <div>{kmRest} KM</div>
      <div>{car.service}</div>
    </div>
  )
};


export default Row;
