import { useState } from 'react';
import { formatMilesSeparator } from 'utils/number';
import carService from '../../../../../services/car.service.js';
import css from './index.css';


const InformationEditableInput = ({ text, onUpdateMileagePreventive }) => {
  const [ prevText, setPrevText ] = useState(text);
  const [ isActive, setIsActive ] = useState(false);

  const onChange = (evt) => {
    setPrevText(evt.target.value)
  };

  const onSave = () => {
    setIsActive(!isActive);
    onUpdateMileagePreventive(prevText);
  };

  const item = isActive
    ? <input defaultValue={text} onChange={onChange} type="text" />
    : <div>{formatMilesSeparator(text)}</div>;

  const iconActive = !isActive
    ? `/static/${VERSION}/images/generic/edit-pencil.svg`
    : `/static/${VERSION}/images/generic/floppy-disk-arrow-in.svg`;

  return (
    <div className={css.editable}>
      <div>{item}</div>
      { prevText == text && !isActive ? <div><img onClick={() => setIsActive(!isActive)} src={iconActive} /></div> : null }
      { prevText != text ? <div><img onClick={onSave} src={iconActive} /></div> : null }
    </div>
  );
};


const Row = ({ car }) => {
  const [ mileagePreventive, setMileagePreventive ] = useState(car.mileage_preventive);

  const onUpdateMileagePreventive = (value) => {
    setMileagePreventive(value)
    const payload = { ...car }
    payload.mileage_preventive = value;
    carService.updateCar(payload)
  }

  const kmRest = formatMilesSeparator(150000 - car.mileage);

  return (
    <div className={css.row}>
      <div>{car.ppu}</div>
      <div>{car.type}</div>
      <div>{formatMilesSeparator(car.mileage)} KM</div>
      <div><InformationEditableInput text={mileagePreventive} onUpdateMileagePreventive={onUpdateMileagePreventive} /></div>
      <div>{kmRest} KM</div>
      <div>{car.service}</div>
    </div>
  );
};


export default Row;
