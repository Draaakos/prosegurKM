import classNames from 'classnames';
import css from './index.css';

const Day = ({ onClick, day }) => {
  const classes = classNames({
    [css.day]: true,
    [css.active]: day.mileage > 0
  });

  return (
    <div onClick={() => onClick(day)} className={classes}>
      <div className={css.hovered}>
        <div>Dia: {day.dateFormmatted}</div>
        <div>KM: {day.mileage}</div>
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
