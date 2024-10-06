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
    <div className={css.preventive_block}>
      <div className={css.preventive_input_text}>{item}</div>
      { prevText == text && !isActive ? <div className={css.preventive_icon}><img onClick={() => setIsActive(!isActive)} src={iconActive} /></div> : null }
      { prevText != text ? <div className={css.preventive_icon}><img onClick={onSave} src={iconActive} /></div> : null }
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

  const KM_LIMIT = 150000;
  const kmRest = KM_LIMIT - car.mileage;
  const preventiveItem = <img className={css.warning_icon} src={`/static/${VERSION}/images/generic/warning-triangle-solid.svg`} />;

  const isWarningActivePrev = car.mileage >= (mileagePreventive - 1000);
  const isWarningActiveRest = kmRest < (KM_LIMIT * 0.10);

  return (
    <div className={css.row}>
      <div>{car.ppu}</div>
      <div>{car.type}</div>
      <div>{formatMilesSeparator(car.mileage)} KM</div>
      <div className={css.input_container}>
        <InformationEditableInput text={mileagePreventive} onUpdateMileagePreventive={onUpdateMileagePreventive} />
        <div>{ isWarningActivePrev ? preventiveItem : null }</div>
      </div>
      <div className={css.rest_content}>
        <div>{formatMilesSeparator(kmRest)} KM</div>
        <div>{ isWarningActiveRest ? preventiveItem : null }</div>
      </div>
      <div>{car.service}</div>
    </div>
  );
};


export default Row;
