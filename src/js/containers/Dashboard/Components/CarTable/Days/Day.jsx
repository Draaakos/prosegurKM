
import classNames from 'classnames';
import { formatMilesSeparator } from 'utils/number';
import css from './index.css';

const Day = ({ isEditable, onClick, day }) => {
  const classes = classNames({
    [css.day]: true,
    [css.active]: day.mileage_am > 0 || day.mileage_pm > 0,
    [css.isEditable]: (isEditable && day.prev_mileage_am) || (isEditable && day.prev_mileage_pm)
  });

  const handler = isEditable
    ? () => onClick(day)
    : () => {};

  return (
    <div onClick={handler} className={classes}>
      <div className={css.hovered}>
        <div className={css.dual}>
          <div>
            <div>Mañana</div>
            <div>Fecha: {day?.dateFormmatted}</div>
            <div>KM Previo: {formatMilesSeparator(day.prev_mileage_am)}</div>
            <div>KM Nuevo: {formatMilesSeparator(day.mileage_am)}</div>
            <div>KM Recorrido: {formatMilesSeparator(day.mileage_am - day.prev_mileage_am)} KM</div>
          </div>
          <div>
            <div>Tarde</div>
            <div>Fecha: {day?.dateFormmatted}</div>
            <div>KM Previo: {formatMilesSeparator(day.prev_mileage_pm)}</div>
            <div>KM Nuevo: {formatMilesSeparator(day.mileage_pm)}</div>
            <div>KM Recorrido: {day.mileage_pm == 0 ? 0 : formatMilesSeparator(day.mileage_pm - day.prev_mileage_pm)} KM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day;
