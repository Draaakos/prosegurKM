import { useEffect, useState } from 'react';
import { formatMilesSeparator } from 'utils/number';
import daysService from '../../../../../services/days.service.js';
import DayList from './DayList';
import css from './index.css';





const Days = ({ car, actions }) => {
  const [ currentDate, setCurrentDate ] = useState(new Date());
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
    if(car.days.length) {
      const currentMonth = getCurrentMonth(car.days[0].dateFormmatted);
      setCurrentMonth(currentMonth);
      setActiveMonth(currentMonth);
    }

    getLastDayUpdatedIdx(car);
  }, []);


  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchDays = debounce((payload) => {
    daysService.fetchDaysByDate(payload)
      .then(response => {
        // if(response.days && response.days.length) {
        setDayList(response.days);
        // setActiveMonth(activeMonth + direction);
        getLastDayUpdatedIdx(response);
        // }
      });
  }, 300);


  const onUpdateDayList = (direction) => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const newDate = new Date(year, month);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);

    const payload = {
      "car": car.id,
      "year": newDate.getFullYear(),
      "month": newDate.getMonth() + 1
    }


    fetchDays(payload);
  };


  const getCurrentMonth = (date) => {
    const [_, month] = date.split('-');
    return parseInt(month);
  };




  const formatDateToString = (date) => {
    const currentDateObj = new Date(date);
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
    const month = currentDateObj.getMonth();
    const year = currentDateObj.getFullYear();

    return `${monthNames[month]} del ${year}`;
  };

  const getTotalMileageInMonth = () => {
    return dayList
      // .filter(day => day.mileage_am && day.mileage_pm)
      .map(day => (day.mileage_pm - day.prev_mileage_pm) + (day.mileage_am - day.prev_mileage_am))
      .reduce((acc, day) => acc + day, 0);
  };


  const component = car.days.length ? (
    <div>
      <div className={css.month_container}>
        <div className={css.month_title}>{formatDateToString(currentDate)}</div>
      </div>
      <div className={css.days_container}>
        <button className={css.prev_month} onClick={() => onUpdateDayList(-1)}>{"<"}</button>
        <div className={css.days}>
          <DayList
            data={dayList}
            lastDayUpdatedIdx={lastDayUpdatedIdx}
            onClick={onClick}
            currentDate={currentDate}
            carId={car.id}
          />
        </div>
        <button className={css.next_month} onClick={() => onUpdateDayList(1)}>{">"}</button>
        <div className={css.month_total}>KM recorridos en el mes: {formatMilesSeparator(getTotalMileageInMonth())}</div>
      </div>
    </div>
  ) : <div>No hay días</div>;

  return (
    <div>
      {component}
    </div>
  );
};

export default Days;
