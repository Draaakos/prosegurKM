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


const Row = ({ car, serviceOptions, onActiveDetails }) => {
  const [ mileagePreventive, setMileagePreventive ] = useState(car.mileage_preventive_limit);

  const onUpdateMileagePreventive = (value) => {
    setMileagePreventive(value);
    const payload = { ...car };
    payload.mileage_preventive_limit = value;
    payload.mileage_preventive_notification = car.mileage_preventive_notification;
    carService.updateCar(payload).then(() => window.location.reload());

  };

  const onUpdateService = (evt) => {
    const payload = { ...car };
    payload.serviceId = evt.target.value;
    carService.updateCar(payload);
  };

  const KM_LIMIT = 150000;
  const kmRest = KM_LIMIT - car.mileage;
  const preventiveItem = <img className={css.warning_icon} src={`/static/${VERSION}/images/generic/warning-triangle-solid.svg`} />;

  const isWarningActivePrev = (car.mileage_preventive_limit - car.mileage_preventive_notification) < car.mileage;
  const isWarningActiveRest = kmRest < (KM_LIMIT * 0.10);

  const stamps = car.stamps.map((stamp, idx) =>
    <div className={css.stamp} key={`stamp-${idx}`} style={{ backgroundColor: stamp.color }}/>
  );

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
      <div>
        <select className={css.selector} onChange={onUpdateService} defaultValue={car.service_id}>
          {serviceOptions.map((option, idx) => <option key={`option-${idx}`} value={option.id}>{option.name}</option>)}
        </select>
      </div>
      <div className={css.stamps}>
        {stamps}
      </div>
      <div>
        <div className={css.moreDetail}>
          <img onClick={() => onActiveDetails(car)} src={`/static/${VERSION}/images/generic/eye.svg`} />
        </div>
      </div>
    </div>
  );
};


export default Row;
