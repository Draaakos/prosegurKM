import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { formatMilesSeparator } from 'utils/number';
import css from './index.css';
import daysService from '../../../../../services/days.service.js';



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
            <div>Fecha: {day.dateFormmatted}</div>
            <div>KM Previo: {formatMilesSeparator(day.prev_mileage_am)}</div>
            <div>KM Nuevo: {formatMilesSeparator(day.mileage_am)}</div>
            <div>KM Recorrido: {formatMilesSeparator(day.mileage_am - day.prev_mileage_am)} KM</div>
          </div>
          <div>
            <div>Tarde</div>
            <div>Fecha: {day.dateFormmatted}</div>
            <div>KM Previo: {formatMilesSeparator(day.prev_mileage_pm)}</div>
            <div>KM Nuevo: {formatMilesSeparator(day.mileage_pm)}</div>
            <div>KM Recorrido: {day.mileage_pm == 0 ? 0 : formatMilesSeparator(day.mileage_pm - day.prev_mileage_pm)} KM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Days = ({ car, actions }) => {
  const [ dayList, setDayList ] = useState(car.days);
  const [ currentMonth, setCurrentMonth ] = useState();
  const [ activeMonth, setActiveMonth ] = useState();
  const [ lastDayUpdatedIdx, setLastDayUpdatedIdx ] = useState();


  const onClick = (day) => {
    actions.onSelectCar(car, day);
  };


  const getLastDayUpdatedIdx = (carData) => {
    const lastDayUpdatedFilter = carData.days
      .map((day, idx) => {
        if(day.mileage_am || day.mileage_pm) {
          return idx
        }
      })
      .filter(x => x);

    const lastDayUpdatedIdx = !lastDayUpdatedFilter.length
      ? lastDayUpdatedFilter.length
      : lastDayUpdatedFilter[lastDayUpdatedFilter.length - 1];

    setLastDayUpdatedIdx(lastDayUpdatedIdx);
  };


  useEffect(() => {
    const currentMonth = getCurrentMonth(car.days[0].dateFormmatted);
    setCurrentMonth(currentMonth);
    setActiveMonth(currentMonth);
    getLastDayUpdatedIdx(car);
  }, []);


  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchDays = debounce((date, direction) => {
    const [day, month, year] = date.split('-');
    const newDate = new Date(year, month - 1, day);
    newDate.setMonth(newDate.getMonth() + direction);

    daysService.fetchDaysByDate(car.id, newDate.getFullYear(), newDate.getMonth() + 1)
      .then(response => {
        if(response.days && response.days.length) {
          setDayList(response.days);
          setActiveMonth(activeMonth + direction);
          getLastDayUpdatedIdx(response);
        }
      });
  }, 300);

  const onUpdateDayList = (date, direction) => {
    fetchDays(date, direction);
  };


  const getCurrentMonth = (date) => {
    const [_, month] = date.split('-');
    return parseInt(month);
  };




  const formatDateToString = (date) => {
    const [_, month, year] = date.split('-');
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    return `${monthNames[parseInt(month) - 1]} del ${year}`;
  };

  const getTotalMileageInMonth = () => {
    return dayList
      // .filter(day => day.mileage_am && day.mileage_pm)
      .map(day => (day.mileage_pm - day.prev_mileage_pm) + (day.mileage_am - day.prev_mileage_am))
      .reduce((acc, day) => acc + day, 0);
  };

  console.log('lastDayUpdatedIdx', lastDayUpdatedIdx);

  return (
    <div>
      <div className={css.month_container}>
        <div className={css.month_title}>{formatDateToString(dayList[0].dateFormmatted)}</div>
      </div>
      <div className={css.days_container}>
        <button onClick={() => onUpdateDayList(dayList[0].dateFormmatted, -1)}>{"<"}</button>
        <div className={css.days}>
          {
            dayList.map((day, idx) =>
              <Day
                isEditable={day.is_editable}
                // isEditable={idx >= lastDayUpdatedIdx}
              // isEditable={idx >= lastDayUpdatedIdx && activeMonth >= currentMonth}
                key={`day-${idx}`} day={day}
                onClick={onClick}
              />
            )
          }
        </div>
        <button onClick={() => onUpdateDayList(dayList[0].dateFormmatted, 1)}>{">"}</button>
        <div className={css.month_total}>KM recorridos en el mes: {formatMilesSeparator(getTotalMileageInMonth())}</div>
      </div>
    </div>
  );
};

export default Days;
