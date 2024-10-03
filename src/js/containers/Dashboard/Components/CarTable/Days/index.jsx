import classNames from 'classnames';
import { formatMilesSeparator } from 'utils/number';
import css from './index.css';

const Day = ({ onClick, day }) => {
  const classes = classNames({
    [css.day]: true,
    [css.active]: day.next_mileage > 0
  });


  const handler = day.next_mileage > 0
    ? () => {}
    : () => onClick(day) ;

  return (
    <div onClick={handler} className={classes}>
      <div className={css.hovered}>
        <div>Fecha: {day.dateFormmatted}</div>
        <div>KM Previo: {formatMilesSeparator(day.prev_mileage)}</div>
        <div>KM Nuevo: {formatMilesSeparator(day.next_mileage)}</div>
        <div>KM Recorrido: {formatMilesSeparator(day.next_mileage - day.prev_mileage)} KM</div>
      </div>
    </div>
  );
};

const Days = ({ car, actions }) => {
  const onClick = (day) => {
    actions.onSelectCar(car, day);
  };

  return (
    <div className={css.days}>
      { car.days.map(day => <Day day={day} onClick={onClick} />) }
    </div>
  )
};

export default Days;
